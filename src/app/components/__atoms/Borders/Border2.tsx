"use client";

import React from "react";

type Component = {
  children: JSX.Element;
  show: boolean;
  pagename: string;
};

const Border2 = ({ pagename, children, show }: Component) => {
  if (!show) {
    return children;
  }

  return (
    <div className="w-[600px] h-[100vh] relative   ">
      <div className="w-[100%] h-[60px] flex flex-row items-center justify-center gap-5">
        <p className=" text-inter text-base font-semibold">{pagename}</p>
      </div>
      <div className="w-[100%] h-[91vh] bg-white rounded-t-3xl shadow-2xs border shadow-md  border-gray-300 outline-[2px] ">
        {children}
      </div>
    </div>
  );
};

export default Border2;
