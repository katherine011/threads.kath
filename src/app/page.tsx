"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Thread from "../icons/Threads.ic.png";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.push("/login");
    setLoading(true);
  }, [router]);

  if (loading) {
    return (
      <div className="w-[100%] left-0 top-0 a h-[100vh] bg-white rounded-t-3xl border shadow-md border-gray-300 outline-[2px] absolute flex items-center justify-center ">
        <Image src={Thread} alt="Animated GIF" width={70} height={70} />
      </div>
    );
  }

  return (
    <div className="bg-[#F2F3F5] flex flex-row items-center justify-center  "></div>
  );
}
