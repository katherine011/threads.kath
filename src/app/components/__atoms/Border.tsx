"use client";

import Image from "next/image";
import React, { useState } from "react";
import Down from "../../../icons/down.png";
import Modal1 from "./Modal1";

interface Props {
  pagename: string;
}

const Border = ({ pagename }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[665px] h-[100vh]   ">
      <div className="w-[100%] h-[60px] flex flex-row items-center justify-center gap-5">
        <p className=" text-inter text-base font-semibold">{pagename}</p>
        <button
          onClick={(e) => setIsOpen(!isOpen)}
          className="rounded-full shadow-md w-6 h-6 border-zinc-300 outline-[2px] border-[0.5px] flex items-center justify-center cursor cursor-pointer hover:h-7 hover:w-7 hover:duration-75"
        >
          <Image
            src={Down}
            alt="arrow"
            width={10}
            height={10}
            className="w-2 h-2 "
          />
          {isOpen && <Modal1 />}
        </button>
      </div>
      <div className="w-[100%] h-[91vh] bg-white rounded-t-3xl shadow-2xs border shadow-md  border-gray-300 outline-[2px] "></div>
    </div>
  );
};

export default Border;
