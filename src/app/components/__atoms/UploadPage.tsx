"use client";

import React, { useEffect, useRef, useState } from "react";
import { db, auth } from "@/app/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import DefaultImage from "../../../images/default.png";
import Add from "../../../icons/add.png";
import Trash from "../../../icons/trash.png";

const API_KEY = "YOUR_IMGBB_API_KEY";
const uploadImageToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=81cd2edbb65540fd469bf8b8ce17d06f`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (data && data.data && data.data.url) {
    return data.data.url;
  }
  throw new Error("Image upload failed!");
};

export default function UploadPage() {
  const [uid, setUid] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(DefaultImage.src);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (uid) {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profileImage) {
            setImageUrl(data.profileImage);
          }
        }
      }
    };
    fetchUserImage();
  }, [uid]);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", closeModal);
    return () => document.removeEventListener("mousedown", closeModal);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setImageUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !uid) return;

    try {
      const uploadedImageUrl = await uploadImageToImgBB(file);
      setImageUrl(uploadedImageUrl);

      await updateDoc(doc(db, "users", uid), {
        profileImage: uploadedImageUrl,
      });

      setIsModalOpen(false);
      console.log("Uploaded & saved:", uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async () => {
    if (!uid || imageUrl === DefaultImage.src) return;

    try {
      await updateDoc(doc(db, "users", uid), {
        profileImage: "",
      });
      setImageUrl(DefaultImage.src);
      console.log("Image deleted.");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Image
          src={imageUrl}
          alt="Profile"
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full cursor-pointer object-cover"
          onClick={() => setIsModalOpen(!isModalOpen)}
          priority={true}
        />
        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute w-[205px] h-[175px] top-48 rounded-xl p-3 bg-white shadow-md border border-gray-300"
          >
            <div className="flex justify-between items-center">
              <label
                htmlFor="file"
                className="w-[200px] cursor-pointer h-[20px] p-6 flex items-center justify-between hover:bg-slate-100 rounded-2xl"
              >
                Choose photo
                <Image
                  src={Add}
                  alt="Add"
                  width={30}
                  height={40}
                  className="w-5 h-5 mt-1"
                />
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="w-[180px] cursor-pointer h-[20px] p-6 pl-10 flex items-center justify-between hover:bg-slate-100 rounded-2xl"
            >
              Upload photo
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-[180px] text-red-500 font-medium text-base cursor-pointer h-[20px] p-6 flex items-center justify-between hover:bg-slate-100 rounded-2xl"
            >
              Delete Picture
              <Image
                src={Trash}
                alt="Trash"
                width={30}
                height={30}
                className="w-5 h-5"
              />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
