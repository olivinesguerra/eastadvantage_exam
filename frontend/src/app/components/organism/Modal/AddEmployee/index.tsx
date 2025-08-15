

"use client";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

import axios from "axios";
import { 
  useForm 
} from "react-hook-form";
import { User } from "../../../../util/constrant";
import { useEffect } from "react";

interface FormParams {
  name?: string,
  email?: string,
  role?: number
}

interface IAddEmployeeProps {
    open: boolean,
    onClose: () => void;
    onCloseAndRedirect: (user: User) => void;
};

interface RegisterResponse {
  code?: number,
  success?: boolean,
  message?: string,
  data: User
}

export const AddEmployee = (props: IAddEmployeeProps) => {
    
    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormParams>({
        defaultValues: { email: "", name: "", role: 0}
    });

    const onSubmit = async(data: FormParams) => {
        const response = await axios.post<RegisterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data, { headers: { Accept: "application/json" }});
        const { data: user } = response?.data;
        props?.onCloseAndRedirect(user);
    };

  return (
    <>
        <Modal className="backdrop-blur-md" size="md" dismissible show={props?.open} onClose={() => props?.onClose()} popup position={"center"}>
            <form className="flex flex-col p-[50px]" onSubmit={handleSubmit((data) => onSubmit(data))}>
                <ModalHeader>Add Employee</ModalHeader>
                <ModalBody>
                    <input className="flex w-full border text-black placeholder-indigo-900 mb-[10px] py-[5px] px-[10px]"  {...register('name', {required: true})} placeholder="Full Name"></input>

                    <input className="flex  w-full border text-black placeholder-indigo-900 py-[5px] px-[10px]" {...register('email', {required: true})} placeholder="Email"></input>
                    
                    <select 
                        className=" w-full mt-[10px] text-black border py-[5px] px-[10px]" 
                        id="role" 
                        {...register("role", { required: true })}
                    >
                        <option className="text-black" value={0}>AUTHOR</option>
                        <option className="text-black" value={1}>EDITOR</option>
                        <option className="text-black" value={2}>SUBSCRIBER</option>
                        <option className="text-black" value={3}>ADMINISTRATOR</option>
                    </select>

                </ModalBody>
                <ModalFooter>
                    <button type="submit" className=" w-full text-white bg-black mt-[10px] flex items-center justify-center py-[5px] px-[10px] rounded">Submit</button>
                </ModalFooter>
            </form>
        </Modal>
    </>

  );
}