"use client";

import { auth, db } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Wait from "../../../../icons/wait.jpg";
import ProfPic from "./ProfPic";

const ProfileHeader = () => {
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-[100%] h-[91vh] bg-white rounded-t-3xl border shadow-md border-gray-300 outline-[2px] absolute flex items-center justify-center ">
        <Image src={Wait} alt="Animated GIF" width={20} height={20} />
      </div>
    );
  }

  return (
    <div className="rounded-t-3xl w-[100%] h-[155px] p-[24px] flex flex-row justify-between  border-gray-300">
      {userData && (
        <div className="w-[100%] flex flex-row justify-between">
          <div>
            <h1 className="text-[#000000] text-inter font-black text-2xl">
              {userData.name}
            </h1>
            <p className="text-[#000000] text-inter ">{userData.username}</p>

            <p className="text-[#716f6f] text-inter mt-[40px] cursor-pointer ">
              111 followers
            </p>
          </div>
          <div>
            <ProfPic />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
