"use client";

import { auth, db } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const Modal2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchUserData = async (uid: string) => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  };

  const handleSaveBio = async () => {
    if (userData?.uid) {
      const userDocRef = doc(db, "users", userData.uid);
      await updateDoc(userDocRef, { bio: bioInput });
      setUserData((prev: any) => ({ ...prev, bio: bioInput }));
      setIsBioOpen(false);
    }
  };

  const handleSaveLink = async () => {
    if (userData?.uid) {
      const userDocRef = doc(db, "users", userData.uid);
      await updateDoc(userDocRef, { link: linkInput });
      setUserData((prev: any) => ({ ...prev, link: linkInput }));
      setIsLinkOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user.uid);
        setUserData((prev: any) => ({ ...prev, uid: user.uid }));
      }
    });
    return () => unsubscribe();
  }, []);

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
    <div className="p-[24px]">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-[550px] h-[40px] flex items-center justify-center pt-3 cursor-pointer bg-white rounded-[12px] border border-gray-300 outline-[2px]"
      >
        <h1 className="text-[#000000] text-inter text-base font-semibold mb-3">
          Edit profile
        </h1>
      </div>
      {isOpen && (
        <>
          <div className="w-[2175px] z-20 h-[1571px] absolute bg-[#0000006f] left-[-800px] top-[-900px] "></div>
          <div
            ref={modalRef}
            className="w-[580px] h-[400px] absolute p-5 z-30 top-40 left-[398px] cursor-pointer bg-white rounded-[12px] shadow-xs border shadow-md border-gray-300 outline-[2px]"
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
            </div>
            <div className="w-[100%] h-[60px] border-b-[2px] outline-black border-gray-300 mt-5 outline-1">
              <h1 className="text-[#000000] text-inter text-base font-semibold">
                Bio:
              </h1>
              <p
                className="text-gray-400 font-inter text-sm mt-2"
                onClick={() => setIsBioOpen(!isBioOpen)}
              >
                + Write Bio
              </p>
              {isBioOpen && (
                <>
                  <div className="w-[1776px] z-20 h-[1411px] absolute bg-[#0000006f] left-[-800px] top-[-900px] "></div>
                  <div className="w-[580px] z-40 h-[230px] left-0 top-12 pt-5 absolute flex flex-col rounded-[17px] border-[1px] border-gray-300 bg-white ">
                    <div className="w-[100%] h-[30px] p-5 flex items-center justify-between text-center  border-b border-gray-300  ">
                      <button
                        onClick={() => setIsBioOpen(false)}
                        className="w-[90px] h-[40px] mb-4 rounded-[13px] border border-gray-400 text-base font-semibold "
                      >
                        Cancel
                      </button>
                      <h1 className=" font-semibold text-lg mb-4 mr-9">
                        Add bio
                      </h1>
                      <button
                        onClick={() => {
                          setBioInput(userData.bio || "");
                          setIsBioOpen(true);
                        }}
                        className="w-[90px] h-[40px] mb-4 rounded-[13px] border border-gray-400 text-base font-semibold "
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-5 w-100% h-auto ">
                      <input
                        type="text"
                        onChange={(e) => setBioInput(e.target.value)}
                        placeholder="Add bio.."
                        className="w-[100%] h-[60px] border-gray-400 outline-gray-400 flex items-start justify-start"
                      />
                      <button
                        onClick={handleSaveBio}
                        className="w-[100%] h-[55px] text-white font-semibold text-base mt-3 ease-in bg-black rounded-[12px] "
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-[100%] h-[60px] border-b-[2px] outline-black border-gray-300 mt-5 outline-1">
              <h1 className="text-[#000000] text-inter text-base font-semibold">
                Link:
              </h1>
              <button
                onClick={() => setIsLinkOpen(!isLinkOpen)}
                className="text-gray-400 font-inter text-sm mt-2"
              >
                + Add Link
              </button>
              {isLinkOpen && (
                <>
                  <div className="w-[1776px] z-20 h-[1411px] absolute bg-[#0000006f] left-[-800px] top-[-900px] "></div>
                  <div className="w-[580px] z-40 h-[230px] left-0 top-12 pt-5 absolute flex flex-col rounded-[17px] border-[1px] border-gray-300 bg-white ">
                    <div className="w-[100%] h-[30px] p-5 flex items-center justify-between text-center  border-b border-gray-300  ">
                      <button
                        onClick={() => setIsLinkOpen(false)}
                        className="w-[90px] h-[40px] mb-4 rounded-[13px] border border-gray-400 text-base font-semibold "
                      >
                        Cancel
                      </button>
                      <h1 className=" font-semibold text-lg mb-4 mr-9">
                        Add link
                      </h1>
                      <button
                        onClick={() => {
                          setIsLinkOpen(true);
                        }}
                        className="w-[90px] h-[40px] mb-4 rounded-[13px] border border-gray-400 text-base font-semibold "
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-5 w-100% h-auto ">
                      <input
                        type="text"
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="Add link.."
                        className="w-[100%] h-[60px] border-gray-400 outline-gray-400 flex items-start justify-start"
                      />
                      <button
                        onClick={handleSaveLink}
                        className="w-[100%] h-[55px] text-white font-semibold text-base mt-3 ease-in bg-black rounded-[12px] "
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </>
              )}
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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[100%] h-[55px] text-white font-semibold text-base mt-3 ease-in bg-black rounded-[12px] "
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal2;
