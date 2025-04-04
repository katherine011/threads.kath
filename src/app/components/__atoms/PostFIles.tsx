import React, { useState } from "react";
import Img from "../../../icons/img.png";
import GIF from "../../../icons/GIF.png";
import Emoji from "../../../icons/emoji.png";
import Poll from "../../../icons/poll.png";
import Location from "../../../icons/location.png";
import Image from "next/image";
import GiphyComponent from "./GiphyComponent";

const PostFIles = () => {
  const [isGif, setIsGif] = useState(false);
  return (
    <div className="w-[140px] mt-4 flex flex-row justify-between items-center">
      <label htmlFor="img">
        <Image
          src={Img}
          alt="img"
          width={30}
          height={30}
          className="w-5 h-5 cursor-pointer"
        />
      </label>
      <input type="file" id="img" className="hidden" accept="image/*" />

      <div onClick={() => setIsGif(!isGif)}>
        <Image
          src={GIF}
          alt="gif"
          width={30}
          height={30}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      {isGif && (
        <div>
          <GiphyComponent />
        </div>
      )}

      <label htmlFor="emoji">
        <Image
          src={Emoji}
          alt="emoji"
          width={30}
          height={30}
          className="w-5 h-5 cursor-pointer"
        />
      </label>
      <input type="file" id="emoji" className="hidden" />

      <label htmlFor="poll">
        <Image
          src={Poll}
          alt="poll"
          width={30}
          height={30}
          className="w-5 h-5 cursor-pointer"
        />
      </label>
      <input type="file" id="" className="hidden" />

      <label htmlFor="location">
        <Image
          src={Location}
          alt="location"
          width={30}
          height={30}
          className="w-5 h-5 cursor-pointer"
        />
      </label>
      <input type="file" id="location" className="hidden" />
    </div>
  );
};

export default PostFIles;
