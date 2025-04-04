"use client";

import React, { useEffect, useRef, useState } from "react";
import DefaultImage from "../../../images/default.png";
import Image from "next/image";
import More from "../../../icons/more.png";
import { auth, db } from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PostFIles from "../__atoms/PostFIles";

const AddPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData({
              name: docSnap.data().name,
              username: docSnap.data().username,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      setImageUrl(savedImage);
    } else {
      setImageUrl(DefaultImage.src);
    }
  }, []);

  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="rounded-t-3xl w-[100%] h-[80px] p-5 border-b cursor-pointer border-gray-300 flex flex-row items-center justify-between"
      >
        <div className="flex flex-row items-center gap-4">
          <Image
            src={imageUrl || DefaultImage}
            alt="profile"
            width={120}
            height={120}
            className="w-[50px] h-[50px] rounded-full"
          />
          <p className="text-gray-400 font-inter text-sm mt-2">What's new?</p>
        </div>
        <button className="border-gray-300 border-[1px] w-[70px] h-[35px] rounded-[12px] hover:w-[72px] hover:h-[37px] bg-white">
          <h1 className="text-[#000000] text-inter text-base font-semibold">
            Post
          </h1>
        </button>
      </div>
      {isModalOpen && (
        <div
          ref={modalRef}
          className="w-[580px] h-[280px] rounded-[16px] absolute top-56 left-[10px] bg-white border-gray-300 border-[1px]"
        >
          <div className="rounded-t-3xl w-[100%] h-[60px] p-5 border-b cursor-pointer border-gray-300 flex flex-row items-center justify-between">
            <button className="text-[#000000] text-inter text-sm font-semibold">
              Cancel
            </button>
            <h1 className="text-[#000000] text-inter text-lg font-semibold">
              New thread
            </h1>
            <div>
              <Image
                src={More}
                alt="more icons"
                width={30}
                height={30}
                className="h-5 w-5"
              />
            </div>
          </div>
          <div className="w-[100%] h-[160px] p-5 flex flex-row gap-4">
            <Image
              src={imageUrl || DefaultImage}
              alt="profile"
              width={120}
              height={120}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-[#000000] text-inter text-base font-semibold">
                {userData?.name}
              </h1>
              <input
                type="text"
                className="text-black font-inter placeholder:text-sm text-lg outline-none border-none placeholder:text-gray-400"
                placeholder="What's new?"
              />
              <PostFIles />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPosts;
