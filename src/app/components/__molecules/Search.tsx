"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  limit,
} from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/app/firebaseConfig";
import Default from "../../../images/default.png";
import Image from "next/image";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setSearchQuery(queryParam);
      setDebouncedQuery(queryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      const encoded = encodeURIComponent(searchQuery);
      router.push(`/search?query=${encoded}`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          orderBy("name"),
          startAt(debouncedQuery),
          endAt(debouncedQuery + "\uf8ff"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
      } catch (err: any) {
        setError("მომხმარებლები ვერ მოიძებნა");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (username: string) => {
    router.push(`/userprofile?username=${username}`);
  };

  return (
    <div className="w-full relative p-4">
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 outline-[1px] outline-zinc-300 border-[1px] border-gray-300 rounded-[15px]"
      />
      <ul className="mt-4">
        {loading && <p>Searching...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {users.map((user: any) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user.username)}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <Image
              src={user.image || Default}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
