import React from "react";
import Input from "../__atoms/Input";
import Button from "../__atoms/Button";
import Image from "next/image";
import Icon1 from "../../../icons/images.png";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="w-[370px] h-[500px] flex flex-col items-center justify-center z-20 mt-28">
      <h1 className="text-[#000000] text-inter text-base font-semibold mb-3">
        Log in with your instagram account
      </h1>
      <form className="w-[370px] h-[185px] flex justify-between flex-col ">
        <Input text="text" placeholder="Username, phone or email" />
        <Input text="password" placeholder="Password" />
        <Button button="Log in" />
      </form>
      <p className="text-[#999999] mb-5 mt-3 cursor-pointer">
        Forgotten password?
      </p>
      <p className="text-[#999999] ">— ‍ ‍or‍‍‍‍‍‍ ‍ ‍ ‍—</p>
      <Link href={"/register"}>
        <div className="w-[370px] h-[86px] rounded-[14px] outline-1 border mt-5 p-5 pl-9 flex flex-row items-center cursor-pointer">
          <Image
            src={Icon1}
            alt="thread icon"
            width={20}
            height={20}
            className="w-[45px] h-[45px] "
          />
          <h1 className="text-[#000000] text-inter text-base font-semibold ml-8">
            Create new account
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default LoginForm;
