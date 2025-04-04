import Border from "@/app/components/__atoms/Borders/Border";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <Border show pagename="Likes">
        <div></div>
      </Border>
    </div>
  );
};

export default Page;
