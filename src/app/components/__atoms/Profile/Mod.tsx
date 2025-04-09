"use client";

import { db } from "@/app/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import ProfPic from "./ProfPic";

const Modal2 = ({
  userData,
  setUserData,
}: {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bioInput, setBioInput] = useState(userData?.bio || "");
  const [linkInput, setLinkInput] = useState(userData?.link || "");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userData) {
      setBioInput(userData.bio || "");
      setLinkInput(userData.link || "");
    }
  }, [userData]);

  const handleSaveAll = async () => {
    if (userData?.uid) {
      const userDocRef = doc(db, "users", userData.uid);
      await updateDoc(userDocRef, {
        bio: bioInput,
        link: linkInput,
      });

      setUserData((prev: any) => ({
        ...prev,
        bio: bioInput,
        link: linkInput,
      }));

      setIsOpen(false);
    }
  };

  const closeModal = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => document.removeEventListener("mousedown", closeModal);
  }, []);

  return (
    <div className="p-6">
      <div
        onClick={() => setIsOpen(true)}
        className="w-[550px] h-[40px] flex items-center justify-center pt-3 cursor-pointer bg-white rounded-[12px] border border-gray-300"
      >
        <h1 className="text-black text-inter font-semibold">Edit profile</h1>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-20" />
          <div
            ref={modalRef}
            className="w-[580px] h-auto absolute p-5 z-30 top-40 left-[398px] bg-white rounded-[12px] border border-gray-300 shadow-md"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="font-semibold">Name:</h1>
                <p>
                  {userData?.username} ( @{userData?.name} )
                </p>
              </div>
              <ProfPic />
            </div>

            {/* Bio */}
            <div className="mt-5 border-b pb-4">
              <h1 className="text-[#000000] text-inter font-semibold">Bio:</h1>
              <div className="mt-2">
                <textarea
                  placeholder="Write something about yourself..."
                  className="w-full h-[60px] px-3 border border-gray-400 rounded-[8px]"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                />
              </div>
            </div>

            {/* Link */}
            <div className="mt-5 border-b pb-4">
              <h1 className="font-semibold">Link:</h1>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add your link..."
                  className="w-full h-[60px] px-3 border border-gray-400 rounded-[8px]"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>
            </div>

            {/* Private profile */}
            <div className="mt-5 border-b pb-4">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Private profile</h1>
                <ToggleSwitch />
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Private profiles can only reply to their followers. Switch to
                public to reply to anyone.
              </p>
            </div>

            <button
              onClick={handleSaveAll}
              className="w-full mt-5 bg-black text-white py-3 rounded-lg"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal2;
