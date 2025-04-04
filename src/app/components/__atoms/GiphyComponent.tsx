"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Gif {
  id: string;
  images: {
    original: {
      url: string;
    };
  };
}

const GiphyComponent: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`
        );
        setGifs(response.data.data);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      }
    };

    fetchGifs();
  }, [API_KEY]);

  return (
    <div className=" gap-4 bg-white w-[200px] h-[200px] ab border-[1px] border-gray-400 p-2 flex flex-wrap">
      {gifs.map((gif) => (
        <Image
          src={gif.images.original.url}
          alt="gif"
          key={gif.id}
          width={300}
          height={300}
          className="w-5 h-5 cursor-pointer"
        />
      ))}
    </div>
  );
};

export default GiphyComponent;
