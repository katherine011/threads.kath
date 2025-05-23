import Border from "@/app/components/__atoms/Borders/Border";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <Border show pagename="Saved">
        <div className="flex items-center justify-center w-[100%] h-[91vh] ">
          <h1 className="font-semibold text-base  ">No saved posts</h1>
        </div>
      </Border>
    </div>
  );
};

export default Page;
