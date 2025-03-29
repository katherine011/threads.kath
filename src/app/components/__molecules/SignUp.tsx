import React from "react";
import Input from "../__atoms/Input";
import Button from "../__atoms/Button";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const SignUp = () => {
  return (
    <div className="z-20">
      <form className="w-[370px] h-[320px] flex flex-col items-center justify-between  mt-40">
        <Input text="text" placeholder="Enter Your Email" />
        <Input text="password" placeholder="Password" />
        <Input text="text" placeholder="FullName" />
        <Input text="text" placeholder="UserName" />
        <Link href={"/foryou"}>
          <Button button="Sign Up" />
        </Link>
      </form>

      <div className="w-[370px] h-[86px] mb-12  rounded-[14px] outline-1 border mt-5 flex flex-col items-center justify-center cursor-pointer">
        <h1 className="text-[#000000] text-inter text-base font-semibold ">
          Already have an account?
        </h1>
        <Link
          href={"/login"}
          className="text-zinc-900 hover:text-slate-600 text-inter text-base font-extrabold"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
