"use client";

import React, { useState } from "react";

interface Props {
  pagename: string;
}

const Border2 = ({ pagename }: Props) => {
  return (
    <div className="w-[665px] h-[100vh]   ">
      <div className="w-[100%] h-[60px] flex flex-row items-center justify-center gap-5">
        <p className=" text-inter text-base font-semibold">{pagename}</p>
      </div>
      <div className="w-[100%] h-[91vh] bg-white rounded-t-3xl shadow-2xs border shadow-md  border-gray-300 outline-[2px] "></div>
    </div>
  );
};

export default Border2;
