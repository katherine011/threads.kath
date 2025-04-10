"use client";

import React from "react";
import ProfileHeader from "../__atoms/Profile/ProfileHeader";
import Modal2 from "../__atoms/Profile/Modal2";
import PostsList from "../__molecules/PostList";
import Posts from "../__atoms/Posts";
import ProfilePosts from "../__atoms/Profile/ProfilePost";

const Profile = () => {
  return (
    <div className="">
      <ProfileHeader />
      <Modal2 />
      <div className="border-t border-gray-300">
        <Posts />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default Profile;
