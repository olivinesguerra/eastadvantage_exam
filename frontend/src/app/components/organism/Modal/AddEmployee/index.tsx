

"use client";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { 
  useForm 
} from "react-hook-form";

interface FormParams {
  name?: string,
  email?: string,
  role?: number
}

interface IAddEmployeeProps {
    open: boolean,
    onClose: () => void;
};

export const AddEmployee = (props: IAddEmployeeProps) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormParams>({
        defaultValues: { email: "", name: "", role: 0}
    });

    const onSubmit = (data: FormParams) => {
        console.log(data);
        reset();

        props?.onClose();
    };

  return (
    <Modal dismissible show={props?.open} onClose={() => props?.onClose()} popup>
        <form className="flex flex-col bg-black w-3/4" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <ModalHeader>Add Employee</ModalHeader>
            <ModalBody>
                <input className="flex border text-black placeholder-indigo-900 mb-[10px] py-[5px] px-[10px]"  {...register('name', {required: true})} placeholder="Full Name"></input>

                <input className="flex border text-black placeholder-indigo-900 py-[5px] px-[10px]" {...register('name', {required: true})} placeholder="Email"></input>
                
                <select 
                    className="flex mt-[10px] text-black border py-[5px] px-[10px]" 
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
                <button type="submit" className="text-white bg-black mt-[10px] flex items-center justify-center py-[5px] px-[10px]">Submit</button>
            </ModalFooter>
        </form>
    </Modal>
  );
}