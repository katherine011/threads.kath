import Image from "next/image";
import React from "react";
import Icons1 from "../../../../icons/threadsic.png";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import HomeButton, { BottomButton } from "../../__atoms/HomeButton";

const Header = () => {
  return (
    <header className="h-[100vh] w-[70px] p-3 bg-[#F2F3F5] flex flex-col justify-between items-center">
      <div>
        <Image
          src={Icons1}
          alt="threads icon"
          width={20}
          height={20}
          className="w-[40px] h-[40px] cursor-pointer hover:h-[45px] hover:w-[45px] hover:duration-[0.3s] absolute left-3"
        />
      </div>
      <HomeButton />
      <BottomButton />
    </header>
  );
};

export default Header;
