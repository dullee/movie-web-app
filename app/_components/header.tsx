"use client ";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./searchBar";
import { Button } from "@/components/ui/button";
import MovieGenres from "./movieGenres";

export default function Header() {
  const [genreIds, setGenreId] = useState<any[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [showGenreList, setShowGenreList] = useState(false);

  const toggleGenre = (genreName: string) => {
    const genre = genreIds.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase(),
    );
    if (!genre) return;

    setSelectedGenreIds((prev) =>
      prev.includes(genre.id)
        ? prev.filter((id) => id !== genre.id)
        : [...prev, genre.id],
    );
  };

  return (
    <div className="fixed top-0 flex flex-row text-black bg-white justify-between w-full px-20 pt-5 pb-9 z-10">
      <Link href="/">
        <div className="text-[#4338CA] font-bold italic font-inter">
          Movie Z
        </div>
      </Link>

      <div className="flex flex-row gap-5 relative">
        <MovieGenres toggleGenre={toggleGenre} />
        <Button onClick={() => setShowGenreList(true)} variant="outline">
          Genre
        </Button>
        <SearchBar />
      </div>

      <Button className="cursor-pointer border">Dark mode</Button>
    </div>
  );
}
