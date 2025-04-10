"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Thread from "../../../icons/Threads.ic.png";
const LogoutButton = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      console.log("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="w-[130px] text-red-700 h-[50px] p-3 rounded-[11px] text-base font-bold font-inter hover:bg-gray-200"
      disabled={loading}
    >
      {loading ? (
        <div className="w-[100%] left-0 top-0 a h-[100vh] bg-white rounded-t-3xl border shadow-md border-gray-300 outline-[2px] absolute flex items-center justify-center ">
          <Image src={Thread} alt="Animated GIF" width={70} height={70} />
        </div>
      ) : (
        <h1>Log Out</h1>
      )}
    </button>
  );
};

export default LogoutButton;
