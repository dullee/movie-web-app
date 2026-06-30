"use client";
import { useState } from "react";
import MovieDetails from "./movieDetails";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

interface movieProps {
  id: number;
  title: string;
  image: string;
  rating: number;
}

export default function MovieCard({ id, title, image, rating }: movieProps) {
  const [cardClicked, setCardClicked] = useState(false);

  return (
    <div
      onClick={() =>
        setCardClicked(true)
      }
      className="flex flex-col bg-[#27272A] rounded-xl cursor-pointer overflow-hidden"
    >
      <img
        className="w-full object-cover"
        src={`${IMAGE_SERVICE_URL}/w500${image}`}
      />
      <div className="p-2">
        <div className="flex">
          <p>{Math.round(rating * 10) / 10}</p>
          <span className="text-[#A1A1AA]">/10</span>
        </div>
        <div className="min-h-14 max-h-14 flex">
          <p className="overflow-hidden">{title}</p>
        </div>
      </div>
    </div>
  );
}
