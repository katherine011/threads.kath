import dynamic from "next/dynamic";

const Border2 = dynamic(
  () => import("@/app/components/__atoms/Borders/Border2"),
  { ssr: false }
);
const Search = dynamic(() => import("@/app/components/__molecules/Search"), {
  ssr: false,
});
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <Border2 show pagename="Search">
        <>
          <Search />
        </>
      </Border2>
    </div>
  );
};

export default Page;
