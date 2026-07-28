"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./searchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import MovieGenres from "./movieGenres";
import { Film, Search, SunIcon, MoonIcon, ChevronDown, X } from "lucide-react";

export default function Header() {
  const [showGenreList, setShowGenreList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showGenreDrop, setShowGenreDrop] = useState(false);
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
  };

  return (
    <div className="fixed top-0 flex flex-row items-center justify-between w-full text-foreground bg-white dark:bg-black xl:px-20 px-4 py-4 z-10">
      <Link href="/" className="shrink-0">
        <div className="text-[#4338CA] font-bold italic font-inter text-lg flex items-center flex-row gap-2">
          <Film size={20} />
          Movie Z
        </div>
      </Link>

      <div className="hidden md:flex flex-row items-center gap-3 relative">
        <Button
          onClick={() => setShowGenreList(!showGenreList)}
          variant="outline"
          className="px-4"
        >
          <ChevronDown className="mr-1 h-4 w-4" />
          Genre
        </Button>

        {showGenreList && (
          <Card className="absolute top-10 left-0 p-5 z-20 w-125">
            <h2 className="font-semibold text-2xl">Genre</h2>
            <h3 className="font-normal text-base text-muted-foreground mb-3">
              See lists of movies by genre
            </h3>
            <hr className="mb-4" />
            <div className="flex flex-wrap gap-4">
              <MovieGenres toggleGenre={toggleGenre} />
            </div>
          </Card>
        )}

        <SearchBar />
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="block md:hidden max-w-45">
          {showMobileMenu ? (
            <div className="w-full h-17.5 fixed left-0 top-0 bg-background flex justify-center   items-center">
              <Button
                variant={"outline"}
                className="w-9 h-9 mr-3"
                onClick={() => setShowGenreDrop(!showGenreDrop)}
              >
                <ChevronDown />
              </Button>

              {showGenreDrop && (
                <Card className="absolute top-15 left-0 p-5 mx-5 z-20 flex">
                  <h2 className="font-semibold text-2xl">Genre</h2>
                  <h3 className="font-normal text-base text-muted-foreground">
                    See lists of movies by genre
                  </h3>
                  <hr />
                  <div className="flex flex-wrap gap-4">
                    <MovieGenres toggleGenre={toggleGenre} />
                  </div>
                </Card>
              )}

              <div className="w-62.75">
                <SearchBar />
              </div>
              <Button
                variant={"ghost"}
                onClick={() => setShowMobileMenu(false)}
              >
                <X />
              </Button>
            </div>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => setShowMobileMenu(true)}
              className="w-9 h-9"
            >
              <Search />
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          className="cursor-pointer border dark:text-white w-9 h-9  shrink-0"
          onClick={toggleDarkMode}
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
