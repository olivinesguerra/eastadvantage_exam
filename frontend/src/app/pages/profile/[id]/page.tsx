'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'next/navigation';

import { User } from "../../../util/constrant";
import { getRoles } from "../../../util/parser";

interface GetUserResponse {
  code?: number,
  success?: boolean,
  message?: string,
  data: User
}

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    console.log(id);
    const getUser = async() => {
      const response = await axios.get<GetUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, { headers: { Accept: "application/json" }});
      const { data } = response?.data;
      setData(data);
    };

    if (id) {
      getUser();
    }
  },[id]);


  return (
    <div className="flex h-screen flex-col w-full justify-start items-center p-[30px]">

      {
          data ? 
            <div className="flex flex-col">

              <div className="flex flex-row">
                <div className="text-black mr-[10px]">Name:</div>
                <div className="text-black">{data?.name}</div>
              </div>

              <div className="flex flex-row">
                <div className="text-black mr-[10px]">Email:</div>
                <div className="text-black">{data?.email}</div>
              </div>

              <div className="flex flex-row">
                <div className="text-black mr-[10px]">Roles:</div>
                <div className="text-black">{getRoles(data?.role || [])}</div>
              </div>

            </div>
            : null
      }
    </div>
  );
};