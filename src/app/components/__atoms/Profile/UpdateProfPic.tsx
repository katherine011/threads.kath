"use client";

import { auth } from "@/app/firebaseConfig";
import { updateProfile } from "firebase/auth";

const UpdateProfPic = async () => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {});
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
};

export { UpdateProfPic };
