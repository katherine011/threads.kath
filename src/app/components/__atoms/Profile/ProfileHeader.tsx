"use client";

import { auth, db } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Thread from "../../../../icons/Threads.ic.png";
import UploadPage from "../UploadPage";

// 👇 Define UserData interface
interface UserData {
  uid: string;
  name: string;
  username: string;
  bio?: string;
  link?: string;
}

const ProfileHeader = () => {
  // 👇 Apply the UserData type
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  // const [openFrom, setOpenFrom] = useState<"bio" | "link" | null>(null);
  // const [currentUid, setCurrentUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setCurrentUid(user.uid);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // 👇 Ensure the data matches UserData
            setUserData({
              uid: user.uid,
              name: data.name,
              username: data.username,
              bio: data.bio,
              link: data.link,
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-[100%] left-0 top-0 a h-[100vh] bg-white rounded-t-3xl border shadow-md border-gray-300 outline-[2px] absolute flex items-center justify-center ">
        <Image src={Thread} alt="Animated GIF" width={70} height={70} />
      </div>
    );
  }

  // const isOwnProfile = currentUid === userData?.uid;

  return (
    <div className="rounded-t-3xl w-[100%] h-auto p-[24px] flex flex-col gap-6 border-gray-300">
      {userData && (
        <>
          <div className="w-[100%] flex flex-row justify-between">
            <div>
              <h1 className="text-[#000000] text-inter font-semibold text-2xl">
                {userData.username}
              </h1>
              <p className="text-[#000000] text-sm text-[inter]">
                {userData.name}
              </p>
              {userData.bio && (
                <p className="text-base mt-3 font-semibold">{userData.bio}</p>
              )}
              <div className="text-[#716f6f] text-inter mt-[40px] cursor-pointer flex flex-row items-center gap-3 ">
                <p className="hover:underline">111 followers</p>
                <p>•</p>
                {userData.link && (
                  <p className="hover:underline">{userData.link}</p>
                )}
              </div>
            </div>
            <div>
              <UploadPage />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
