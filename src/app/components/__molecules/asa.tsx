"use client";

import React, { useEffect, useRef, useState } from "react";
import DefaultImage from "../../../images/default.png";
import Image from "next/image";
import More from "../../../icons/more.png";
import { auth, db } from "@/app/firebaseConfig";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const AddPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData({
            name: docSnap.data().name,
            username: docSnap.data().username,
          });
          setImageUrl(docSnap.data().profileImage || DefaultImage.src);
        }
      }
    });

    document.addEventListener("mousedown", closeModal);
    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, "posts/" + file.name);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploadedImageUrl(url);
    }
  };

  const handlePost = async () => {
    if (!postText.trim() || !userData) return;

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        text: postText,
        imageUrl: uploadedImageUrl,
        author: {
          name: userData.name,
          username: userData.username,
          profileImage: imageUrl,
        },
        createdAt: Timestamp.now(),
        likes: [], // ✅ ლაიქების ცარიელი მასივი
      });
      console.log("Post added with ID:", docRef.id);
      setPostText("");
      setUploadedImageUrl("");
    } catch (error) {
      console.error("Error adding post:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="w-20 h-14 z-10   mt-[-20px]  absolute"
      ></div>

      {isModalOpen && (
        <>
          <div className="w-[2175px] z-20 h-[1571px] absolute bg-[#000000b0] left-[-800px] top-[-900px] "></div>
          <div
            ref={modalRef}
            className="w-[580px] h-[250px]   rounded-[16px] z-30 flex flex-col absolute top-56 left-[400px] bg-white border-gray-300 border-[1px]"
          >
            <div className="rounded-t-3xl w-[100%] z-30 bg-white h-[60px] p-5 border-b cursor-pointer border-gray-300 flex flex-row items-center justify-between">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#000000] text-inter text-sm font-semibold"
              >
                Cancel
              </button>

              {isOpen && (
                <>
                  <div className="w-[1774px] z-20 h-[1347px] absolute bg-[#0000006f] left-[-800px] top-[-900px] "></div>
                  <div
                    ref={modalRef}
                    className="absolute left-[170px] z-30 top-[50px] w-[260px] h-[170px] rounded-xl text-center justify-center  bg-white shadow-md border border-gray-300"
                  >
                    <div className="w-[100% ]h-[60px] p-5 ">
                      <h1 className="text-[#000000] text-inter text-lg font-semibold">
                        Delete post?
                      </h1>
                      <p className="text-gray-400 font-inter text-sm mt-2">
                        If you delete this post, you wont be able to restore it.
                      </p>
                    </div>
                    <div className="w-[100%] h-[54px] pl-6  flex flex-row justify-between border-t border-gray-400 ">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-[#b03434] text-inter w-[105px] pr-4 border-r border-gray-400 text-xl font-semibold"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#000000] p-3 text-inter pr-7 text-xl font-xl font-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}

              <h1 className="text-[#000000] text-inter text-lg font-semibold">
                New thread
              </h1>
              <div>
                <Image
                  src={More}
                  alt="more icons"
                  width={30}
                  height={30}
                  className="h-5 w-5"
                />
              </div>
            </div>

            <div className="w-[100%] h-[120px] p-5 flex flex-row gap-4">
              <Image
                src={imageUrl || DefaultImage}
                alt="profile"
                width={120}
                height={120}
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col w-[100%] items-start">
                <h1 className="text-[#000000] text-inter text-base font-semibold">
                  {userData?.name}
                </h1>
                <input
                  type="text"
                  className="text-black w-[100%] h-[auto] font-inter flex flex-wrap placeholder:text-sm text-lg outline-none border-none placeholder:text-gray-400"
                  placeholder="What's new?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
                {uploadedImageUrl && (
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded image"
                    className="w-[100px] h-[100px]"
                  />
                )}
              </div>
            </div>

            <div className="w-[100%] flex flex-row items-center justify-between p-5">
              <p className="text-gray-400 font-inter text-sm mt-2">
                Profiles that you follow can reply and quote
              </p>
              <button
                onClick={handlePost}
                className="border-gray-300 border-[1px] w-[70px] h-[35px] rounded-[12px] hover:w-[72px] hover:h-[37px] bg-white"
              >
                <h1 className="text-[#000000] text-inter text-base font-semibold">
                  Post
                </h1>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddPosts;
