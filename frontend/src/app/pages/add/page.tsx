'use client';
import React, { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import { Modal } from "../../components/organism";

interface User {
  id?: string,
  name?: string,
  email?: string,
  email_verified_at?: boolean | null,
  role?: number[],
  lock_version?: number | null,
  created_at?: string,
  updated_at?: string
};

interface GetUsersResponse {
  code?: number,
  success?: boolean,
  message?: string,
  data: User[]
}

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsers = async() => {
      const response = await axios.get<GetUsersResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, { headers: { Accept: "application/json" }});
      const { data } = response?.data;
      setData(data);
    };
    getAllUsers();
  },[]);

  const onClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const getRoles = (roles: number[]) => {
    let role = "";

    for (const index in roles) {
      if(roles[index] === 0) {
        role += "Auditor "
      } else if (roles[index] === 1) {
        role += "Editor "
      } else if (roles[index] === 2) {
        role += "Subscriber "
      } else if (roles[index] === 3) {
        role += "Administrator "
      }
    } 

    return role;
  }

  return (
    <div className="flex h-screen flex-col w-full justify-start items-center p-[30px]">
      <button className="flex items-center justify-center text-black" onClick={onClicked}>Add Employee</button>

      <div className="w-full overflow-x-auto mt-[50px]">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell className="text-center text-black">Id</TableHeadCell>
              <TableHeadCell className="text-center text-black">Name</TableHeadCell>
              <TableHeadCell className="text-center text-black">Email</TableHeadCell>
              <TableHeadCell className="text-center text-black">Role</TableHeadCell>
              <TableHeadCell>
                <span className="text-center text-black">Action</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {
              data?.map((item: User, index: number) => {
                return (
                  <TableRow key={index} className="bg-white h-[50px]">
                    <TableCell className="text-center text-black">
                      {item?.id}
                    </TableCell>
                    <TableCell className="text-center text-black">{item?.name}</TableCell>
                    <TableCell className="text-center text-black">{item?.email}</TableCell>
                    <TableCell className="text-center text-black">{getRoles(item?.role || [])}</TableCell>
                    <TableCell>
                      <button className="text-center text-black">
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </div>

      <Modal.AddEmployee 
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />

    </div>
  );
};