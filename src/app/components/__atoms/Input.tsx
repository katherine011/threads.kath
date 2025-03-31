import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorIcon from "../../../icons/error.png";
import Image from "next/image";

interface Props {
  text: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

const Input = ({ text, placeholder, register, error }: Props) => {
  return (
    <div className="w-[370px] relative">
      <input
        type={text}
        placeholder={placeholder}
        {...register}
        className={`w-full h-[55px] p-4 outline-zinc-500 rounded-[14px] placeholder-slate-400 placeholder:font-medium transition-all 
          ${
            error
              ? "border-2 border-red-500 outline-red-700 bg-red-100 focus:border-red-700"
              : "bg-[#F5F5F5] border border-gray-300 focus:border-black"
          }`}
      />
      {error && (
        <div className="relative group">
          <Image
            src={ErrorIcon}
            alt="error icons"
            width={20}
            height={20}
            className={` absolute top-[-37px] right-4 cursor-pointer`}
          ></Image>

          <div
            className={`absolute top-[-75px] right-[-215px] hidden group-hover:block w-[auto] h-[auto ] bg-[#8b1e1e] p-2 rounded-[11px] `}
          >
            {error && <p className="text-white">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
