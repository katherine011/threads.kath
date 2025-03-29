import React from "react";

interface Props {
  text: string;
  placeholder: string;
}

const Input = ({ text, placeholder }: Props) => {
  return (
    <input
      type={text}
      placeholder={placeholder}
      className={`w-[370px] h-[55px] bg-[#F5F5F5] p-4 outline-1 outline-[#F2F3F5] rounded-[14px] placeholder-slate-400 placeholder:font-medium`}
    />
  );
};

export default Input;
