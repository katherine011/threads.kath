import Border from "@/app/components/__atoms/Borders/Border";
import Posts from "@/app/components/__atoms/Posts";
import AddPosts from "@/app/components/__molecules/AddPosts";
import PostsList from "@/app/components/__molecules/PostList";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F2F3F5] w-[100%] h-[100vh] flex flex-row items-center justify-center ">
      <Border show pagename="For you">
        <>
          <Posts />
          <PostsList />
        </>
      </Border>
    </div>
  );
};

export default Page;
