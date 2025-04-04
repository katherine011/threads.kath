import React from "react";
import Image from "next/image";
import Background from "../../../images/background.jpg";
import Privace from "@/app/components/__atoms/Privace";
import LoginForm from "@/app/components/__organisms/LoginForm";

const Page = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#fdfdfd;] flex items-center justify-center flex-col  ">
      <Image
        src={Background}
        alt="Background"
        width={500}
        height={500}
        className="w-[100%] h-[200px] absolute top-0 z-10"
        priority
      />
      <LoginForm />
      <Privace />
    </div>
  );
};

export default Page;
