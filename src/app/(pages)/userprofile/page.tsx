import React from "react";
import dynamic from "next/dynamic";

const UserProfile = dynamic(
  () => import("../../components/__molecules/UserProfile"),
  { ssr: false }
);

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <UserProfile />
    </div>
  );
};

export default Page;
