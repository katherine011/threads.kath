"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Thread from "../../../icons/Threads.ic.png";
const LogoutButton = () => {
  const [isClient, setIsClient] = useState(false); // State to check if it's client-side rendering
  const [loading, setLoading] = useState(false); // Loading state to manage logout loading
  const router = useRouter(); // useRouter for navigation

  useEffect(() => {
    setIsClient(true); // Set client-side flag when component mounts
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true); // Set loading to true when logout starts
      await signOut(auth); // Sign out user
      console.log("Logged out successfully");
      router.push("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false); // Reset loading state after logout completes
    }
  };

  if (!isClient) {
    return null; // Don't render until client-side is ready
  }

  return (
    <button
      onClick={handleLogout}
      className="w-[130px] text-red-700 h-[50px] p-3 rounded-[11px] text-base font-bold font-inter hover:bg-gray-200"
      disabled={loading} // Disable button while loading
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
