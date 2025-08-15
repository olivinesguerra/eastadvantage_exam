'use client';
import React, { MouseEvent, useEffect, useState } from "react";

import { Modal } from "../../components/organism"

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  const onClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <div className="flex h-screen flex-col w-full justify-center items-center py-[30px]">
      <button className="flex items-center justify-center text-black" onClick={onClicked}>Add Employee</button>
      <Modal.AddEmployee 
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />

    </div>
  );
};