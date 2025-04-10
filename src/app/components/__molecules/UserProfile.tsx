"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Default from "../../../images/default.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Thread from "../../../icons/Threads.ic.png";

const UserProfile = () => {
  interface User {
    name: string;
    username: string;
    bio?: string;
    link?: string;
    image?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (!username) return;
    console.log("Requested username: ", username);
    const fetchUserProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const mappedUser: User = {
            name: userData.name,
            username: userData.username,
            bio: userData.bio,
            link: userData.link,
            image: userData.image,
          };
          setUser(mappedUser);
        } else {
          setError("მომხმარებელი არ existe");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleFollow = async () => {
    if (!user) return;
    console.log(`Followed ${user.name}`);
  };

  if (loading) {
    return (
      <div className="w-[100%] left-0 top-0 a h-[100vh] bg-white rounded-t-3xl border shadow-md border-gray-300 outline-[2px] absolute flex items-center justify-center ">
        <Image src={Thread} alt="Animated GIF" width={70} height={70} />
      </div>
    );
  }
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      {user ? (
        <>
          <div className="flex flex-row items-center justify-between w-[100%] p-5 ">
            <div>
              <h1 className="text-2xl font-semibold mt-4">{user.name}</h1>
              <p className="text-lg text-gray-600 ">{user.username}</p>
              {user.bio && <p className="text-start mt-2">{user.bio}</p>}
              <div className="text-[#716f6f] text-inter mt-[40px] cursor-pointer flex flex-row items-center gap-3 ">
                <p className="hover:underline">111 followers</p>
                <p>•</p>
                {user.link && (
                  <p className="hover:underline">
                    <a
                      href={user.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.link}
                    </a>
                  </p>
                )}
              </div>{" "}
            </div>
            <Image
              src={user.image || Default}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="border-b border-gray-300 p-5 ">
            <button
              onClick={() => {
                handleFollow();
                setFollow(!follow);
              }}
              className={`w-[100%] h-[45px]  rounded-[13px] text-base font-semibold ${
                follow
                  ? "bg-black text-white"
                  : "bg-white border-gray-300 border text-black"
              }`}
            >
              {follow ? "Follow" : "Unfollow"}
            </button>
          </div>
        </>
      ) : (
        <p>This user Doesnt exist.</p>
      )}
    </div>
  );
};

export default UserProfile;
