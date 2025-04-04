"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ref, deleteObject } from "firebase/storage";
import DefaultImage from "../../../../images/default.png";
import { UploadProfPic } from "./UploadProfPic";
import { storage } from "@/app/firebaseConfig";
import Add from "../../../../icons/add.png";
import Trash from "../../../../icons/trash.png";

const ProfPic = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  useEffect(() => {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      setImageUrl(savedImage);
    } else {
      setImageUrl(DefaultImage.src);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const url = await UploadProfPic(file);
      if (url) {
        setImageUrl(url);
        localStorage.setItem("profilePic", url);
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (imageUrl && imageUrl !== DefaultImage.src) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      localStorage.removeItem("profilePic");
      setImageUrl(DefaultImage.src);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Image
          src={imageUrl || DefaultImage.src}
          alt="Profile"
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full cursor-pointer object-cover"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute w-[205px] h-[125px] right-3 top-48 rounded-xl p-3 bg-white shadow-md border border-gray-300"
          >
            <div className="flex flex-row w-[100%] justify-between items-center">
              <label
                htmlFor="file"
                className=" w-[200px] cursor-pointer h-[20px] p-6 flex items-center flex-row justify-between hover:bg-slate-100 rounded-2xl"
              >
                Upload photo
                <Image
                  src={Add}
                  alt="Add icon"
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
              onClick={handleDelete}
              className=" w-[180px] text-red-500 font-medium text-base font-inter cursor-pointer h-[20px] p-6 flex items-center flex-row justify-between hover:bg-slate-100 rounded-2xl"
            >
              Delete Picture
              <Image
                src={Trash}
                alt="Trash icon"
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
};

export default ProfPic;
