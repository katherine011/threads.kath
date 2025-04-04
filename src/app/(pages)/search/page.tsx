import Border2 from "@/app/components/__atoms/Borders/Border2";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <Border2 show pagename="Search">
        <div></div>
      </Border2>
    </div>
  );
};

export default Page;
