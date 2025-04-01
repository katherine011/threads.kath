import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Right from "../../../icons/right.png";
import Image from "next/image";
import Add from "../../../icons/addmore.png";

export const name = [
  { name: "For you", href: "/home" },
  { name: "Following", href: "/following" },
  { name: "Likes", href: "/likes" },
  { name: "Saved", href: "/saved" },
];

const Modal1 = () => {
  const path = usePathname();
  return (
    <div className="w-[230px] h-[270px] absolute top-12  flex-col flex justify-between p-2 rounded-xl bg-white shadow-2xs border shadow-md  border-gray-300 outline-[2px] ">
      {name.map(({ name, href }) => {
        return (
          <div
            key={name}
            className="w-[214px] h-[35px] p-6 flex items-center flex-row justify-between hover:bg-slate-100 rounded-2xl"
          >
            <Link
              href={href}
              className="flex flex-row justify-between w-[244px] text-inter text-base font-semibold"
            >
              {name}
              {path === href && (
                <div className="w-5 h-5 flex items-center ">
                  <Image
                    src={Right}
                    alt="tight icon"
                    width={10}
                    height={10}
                    className="w-4 h-4"
                  />
                </div>
              )}
            </Link>
          </div>
        );
      })}
      <div className="w-[100%] h-[1px] bg-gray-300"></div>
      <div className="w-[214px] h-[35px] p-6 flex items-center flex-row justify-between hover:bg-slate-100 rounded-2xl">
        <p className="flex flex-row justify-between w-[244px] text-inter text-base font-semibold">
          Create new feed
        </p>
        <Image
          src={Add}
          alt="add icons"
          width={10}
          height={10}
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

export default Modal1;
