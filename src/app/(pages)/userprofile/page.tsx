import Border2 from "@/app/components/__atoms/Borders/Border2";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import UserProfile to handle potential SSR issues
const UserProfile = dynamic(() => import("@/app/components/__molecules/UserProfile"), { ssr: false });

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center">
      <Border2 show pagename="Profile">
        <>
          <UserProfile />
        </>
      </Border2>
    </div>
  );
};

export default Page;
