"use client";

import { auth, db } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@mui/material";
import ToggleSwitch from "./ToggleSwitch";
import ProfPic from "./ProfPic";

const Modal2 = () => {
  const [isOpen, setIsModal] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [isOpen]);

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
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-[24px]">
      <div
        onClick={() => setIsModal((prev) => !prev)}
        className="w-[550px] h-[40px] flex items-center justify-center pt-3 cursor-pointer bg-white rounded-[12px] border border-gray-300 outline-[2px]"
      >
        <h1 className="text-[#000000] text-inter text-base font-semibold mb-3">
          Edit profile
        </h1>
      </div>
      {isOpen && (
        <div
          ref={modalRef}
          className="w-[580px] h-[350px] absolute p-5 top-10 right-2 cursor-pointer bg-white rounded-[12px] shadow-xs border shadow-md border-gray-300 outline-[2px]"
        >
          <div className="w-[100%] h-[60px] flex flex-row justify-between">
            <div className="flex flex-col w-[420px] border-b-[2px] outline-black border-gray-300 outline-1">
              <h1 className="text-[#000000] text-inter text-base font-semibold">
                Name:
              </h1>
              <p className="text-inter">
                {userData?.username} {" (@"}
                {userData?.name}
                {")"}
              </p>
            </div>
            <ProfPic />
          </div>
          <div className="w-[100%] h-[60px] border-b-[2px] outline-black border-gray-300 mt-5 outline-1">
            <h1 className="text-[#000000] text-inter text-base font-semibold">
              Bio:
            </h1>
            <p className="text-gray-400 font-inter text-sm mt-2">+ Write Bio</p>
          </div>
          <div className="w-[100%] h-[60px] border-b-[2px] outline-black border-gray-300 mt-5 outline-1">
            <h1 className="text-[#000000] text-inter text-base font-semibold">
              Link:
            </h1>
            <button className="text-gray-400 font-inter text-sm mt-2">
              + Add Link
            </button>
          </div>
          <div className="w-[100%] h-[60px] border-b-[2px] outline-black border-gray-300 mt-5 outline-1">
            <div className="w-[100%] flex flex-row justify-between items-center">
              <h1 className="text-[#000000] text-inter text-base font-semibold">
                Private profile
              </h1>
              <ToggleSwitch />
            </div>
            <p className="text-gray-400 font-inter text-xs mt-2">
              Private profiles can only reply to their followers. Switch to
              public to reply to anyone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal2;
