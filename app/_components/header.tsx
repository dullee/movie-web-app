"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./searchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import MovieGenres from "./movieGenres";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";

export default function Header() {
  const [showGenreList, setShowGenreList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const toggleGenre = (genre: { id: number; name: string }) => {
    setShowGenreList(false);
    router.push(
      `/search?genreId=${genre.id}&genreName=${encodeURIComponent(genre.name)}`,
    );
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(!darkMode);
    const newTheme = savedTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    console.log(localStorage.getItem("theme"));
  };
  return (
    <div className="fixed top-0 flex flex-row text-foreground bg-white dark:bg-black justify-between w-full px-20 pt-5 pb-9 z-10">
      <Link href="/">
        <div className="text-[#4338CA] font-bold italic font-inter">
          Movie Z
        </div>
      </Link>

      <div className="flex flex-row gap-5 relative">
        {showGenreList && (
          <Card className="absolute top-10">
            <div>
              <MovieGenres toggleGenre={toggleGenre} />
            </div>
          </Card>
        )}
        <Button
          onClick={() => setShowGenreList(!showGenreList)}
          variant="outline"
        >
          Genre
        </Button>
        <SearchBar />
      </div>

      <Button
        variant={"outline"}
        className="cursor-pointer border dark:text-white"
        onClick={toggleDarkMode}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  );
}
