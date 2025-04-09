"use client";

import React, { useEffect, useRef, useState } from "react";
import AddPosts from "../__molecules/AddPosts";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/firebaseConfig";
import DefaultImage from "../../../images/default.png";

const Posts = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData({
            name: docSnap.data().name,
            username: docSnap.data().username,
          });
          setImageUrl(docSnap.data().profileImage || DefaultImage.src);
        }
      }
    });
  }, []);
  return (
    <div className="z-10">
      <div className="rounded-t-3xl w-[100%] h-[80px] p-5 z-10 bg-white border-b cursor-pointer border-gray-300 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 bg-white">
          <Image
            src={imageUrl || DefaultImage}
            alt="profile"
            width={120}
            height={120}
            className="w-[50px] h-[50px] rounded-full"
          />
          <p className="text-gray-400 font-inter text-sm mt-2">What's new?</p>
          <AddPosts />
        </div>
        <button className="border-gray-300  border-[1px] w-[70px] h-[35px] rounded-[12px] hover:w-[72px] hover:h-[37px] ease-in-out bg-white">
          <h1 className="text-[#000000] text-inter text-base font-semibold">
            Post
            <AddPosts />
          </h1>
        </button>
      </div>
    </div>
  );
};

export default Posts;
