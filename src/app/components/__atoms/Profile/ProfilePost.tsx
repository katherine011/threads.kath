"use client";

import React, { useEffect, useRef, useState } from "react";
import { db, auth } from "@/app/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import Image from "next/image";
import More from "../../../../icons/more.png";
import Comment from "../../../../icons/comment.png";
import DefaultImage from "../../../../images/default.png";
import { onAuthStateChanged } from "firebase/auth";

interface Post {
  id: string;
  text: string;
  imageUrl: string;
  createdAt: any;
  author: {
    name: string;
    username: string;
    profileImage: string;
  };
  likes?: string[];
  comments?: { user: string; commentText: string; createdAt: any }[];
}

const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [commentOpenPostId, setCommentOpenPostId] = useState<string | null>(
    null
  );
  const [selectedComment, setSelectedComment] = useState<{
    postId: string;
    commentIndex: number;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<{
    name: string;
    username: string;
  } | null>(null);

  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];

      // ფილტრაცია: მხოლოდ შენი პოსტები
      const userPosts = postsData.filter(
        (post) => post.author.username === user?.displayName
      );
      setPosts(userPosts); // მხოლოდ შენი პოსტები
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenPostId(null);
      }
    };
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  const handleLikePost = async (postId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const postRef = doc(db, "posts", postId);
    const currentPost = posts.find((p) => p.id === postId);
    if (!currentPost) return;

    const hasLiked = currentPost.likes?.includes(user.uid);

    try {
      await updateDoc(postRef, {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId: string) => {
    const user = auth.currentUser;
    if (!user || !commentText) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.error("User document not found");
        return;
      }

      const { name } = userSnap.data();

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          user: name,
          commentText: commentText,
          createdAt: new Date(),
        }),
      });

      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  let pressTimer: NodeJS.Timeout;

  const handleMouseDown = (postId: string, index: number) => {
    pressTimer = setTimeout(() => {
      setSelectedComment({ postId, commentIndex: index });
      setIsDeleteModalOpen(true);
    }, 600);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  const handleDeleteComment = async () => {
    if (!selectedComment) return;

    const post = posts.find((p) => p.id === selectedComment.postId);
    if (!post || !post.comments) return;

    const commentToDelete = post.comments[selectedComment.commentIndex];

    try {
      const postRef = doc(db, "posts", selectedComment.postId);
      await updateDoc(postRef, {
        comments: arrayRemove(commentToDelete),
      });

      setIsDeleteModalOpen(false);
      setSelectedComment(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {posts.map((post) => (
        <div key={post.id} className="w-full p-4 border-b border-gray-200 ">
          <div className="flex justify-between">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={imageUrl || DefaultImage}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 "
              />
              <div>
                <h1 className="font-bold text-black text-sm">
                  {post.author.name}
                </h1>
                <p className="text-gray-500 text-xs">@{post.author.username}</p>
              </div>
            </div>
            <div className="">
              <Image
                src={More}
                alt="more icon"
                width={20}
                height={20}
                className="cursor-pointer z-10"
                onClick={() =>
                  setOpenPostId(post.id === openPostId ? null : post.id)
                }
              />
              {openPostId === post.id && (
                <>
                  <div className="w-[2175px] z-20 h-[1571px] absolute bg-[#0000006f] left-[-800px] top-[-900px] "></div>
                  <div
                    ref={modalRef}
                    className="absolute left-[600px] z-30 top-[260px] w-[260px] h-[170px] rounded-xl text-center justify-center  bg-white shadow-md border border-gray-300"
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
                        onClick={() => handleDeletePost(post.id)}
                        className="text-[#b03434] text-inter w-[105px] pr-4 border-r border-gray-400 text-xl font-semibold"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setOpenPostId(null)}
                        className="text-[#000000] p-3 text-inter pr-7 text-xl font-xl font-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="pl-[52px]">
            <p className="text-black text-sm">{post.text}</p>
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt="Post image"
                width={500}
                height={300}
                className="rounded-lg mt-3"
              />
            )}
            <div className="flex flex-row items-center  mt-3">
              <button
                onClick={() => handleLikePost(post.id)}
                className="text-sm text-black flex "
              >
                {post.likes?.includes(auth.currentUser?.uid || "")
                  ? "❤️"
                  : "🤍"}
                <span
                  className={`text-sm font-medium ${
                    (post.likes?.length || 0) > 0
                      ? "text-red-700"
                      : "text-gray-500"
                  }`}
                >
                  {post.likes?.length || 0}
                </span>
              </button>

              <Image
                onClick={() =>
                  setCommentOpenPostId(
                    post.id === commentOpenPostId ? null : post.id
                  )
                }
                src={Comment}
                alt="comment icon"
                width={30}
                height={30}
                className="w-[20px] h-[20px] ml-2 cursor-pointer "
              />
            </div>
            {commentOpenPostId === post.id && (
              <>
                <div className="w-[2175px] z-20 h-[1971px] absolute bg-[#000000ab] left-[-800px] top-[-900px] "></div>
                <div className="absolute left-[400px] border z-30 border-gray-300 rounded-2xl shadow-lg w-[580px] h-[auto] bg-white  ">
                  <div className="w-[580px] z-40 h-[60px] pl-2 pr-2 border-b border-gray-400 flex items-center flex-row justify-between ">
                    <button
                      onClick={() => setCommentOpenPostId(null)}
                      className=" border-[1px] rounded-xl text-base font-semibold border-gray-300  text-black  w-[70px] h-[40px] m-2"
                    >
                      Cancel
                    </button>
                    <h1 className="text-[#000000] text-inter text-lg mr-12 font-semibold">
                      Reply
                    </h1>
                    <Image
                      src={More}
                      alt="more"
                      width={30}
                      height={30}
                      className="w-[20px] h-[20px] cursor-pointer "
                    />
                  </div>

                  <div className="ml-5 relative">
                    {post.comments?.map((comment, index) => (
                      <div
                        key={index}
                        className=" pt-2 mb-2"
                        onMouseDown={() => handleMouseDown(post.id, index)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={() => handleMouseDown(post.id, index)}
                        onTouchEnd={handleMouseUp}
                      >
                        <p className="text-sm font-semibold cursor-pointer">
                          {comment.user}{" "}
                        </p>
                        <p className="text-xs text-gray-600 cursor-pointer">
                          {comment.commentText}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="w-[100%] h-auto flex flex-row items-center justify-between gap ">
                    <input
                      value={commentText}
                      placeholder="Add a comment..."
                      className="w-full p-2 border border-gray-400 rounded-md m-2"
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className="mt-2 p-2 bg-black text-white rounded w-[60px] h-[40px] m-2"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Add
                    </button>
                  </div>
                  {isDeleteModalOpen && (
                    <div
                      ref={modalRef}
                      className="absolute left-[180px] z-30 top-[50px] w-[260px] h-[170px] rounded-xl text-center justify-center  bg-white shadow-md border border-gray-300"
                    >
                      <div className="w-[100% ]h-[60px] p-5 ">
                        <h1 className="text-[#000000] text-inter text-lg font-semibold">
                          Delete comment?
                        </h1>
                        <p className="text-gray-400 font-inter text-sm mt-2">
                          If you delete this post, you wont be able to restore
                          it.
                        </p>
                      </div>
                      <div className="w-[100%] h-[54px] pl-6  flex flex-row justify-between border-t border-gray-400 ">
                        <button
                          onClick={handleDeleteComment}
                          className="text-[#b03434] text-inter w-[105px] pr-4 border-r border-gray-400 text-xl font-semibold"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setIsDeleteModalOpen(false)}
                          className="text-[#000000] p-3 text-inter pr-7 text-xl font-xl font-black"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
