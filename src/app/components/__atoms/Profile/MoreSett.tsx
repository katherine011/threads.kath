"use client";

import React, { useRef } from "react";
import LogoutButton from "../LogOut";

const MoreSett = () => {
  // const [setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // const closeModal = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     setIsModalOpen(false);
  //   }
  // };

  return (
    <div
      ref={modalRef}
      className="w-[150px] h-[160px] p-2  flex flex-col items-center justify-between absolute left-[50px] top-[470px] border-[1px] border-gray-300 rounded-[15px] shadow-lg z-40 bg-white  "
    >
      <div className="w-[130px] h-[50px] p-3 rounded-[11px] text-base font-semibold font-inter hover:bg-gray-200">
        <h1>Appearance</h1>
      </div>
      <div className="w-[130px] h-[50px] p-3 rounded-[11px] text-base font-semibold font-inter hover:bg-gray-200">
        <h1>Settings</h1>
      </div>
      <LogoutButton />
    </div>
  );
};

export default MoreSett;
