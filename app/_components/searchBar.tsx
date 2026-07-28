"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface movieProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function SearchBar({}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchOuput, setSearchOutput] = useState<movieProps[]>([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(true);

  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchInput.trim())}`;
    }
  };

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchOutput([]);
      setLoadingSearchResults(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoadingSearchResults(true);
      try {
        const res = await axios.get(
          `${BASE_API}/search/movie?query=${encodeURIComponent(searchInput)}&language=en-US&page=1`,
          { headers },
        );
        setSearchOutput(res.data.results || []);
      } catch (error) {
        console.error("Failed fetching movies:", error);
      } finally {
        setLoadingSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
    <div className="relative md:w-94.75">
      <InputGroup className="max-w-xs border-none md:border">
        <div className="pr-2">
          <InputGroupInput
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border-none h-9 md:w-64"
          />
        </div>

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {searchInput && (
        /* Added max-h-[450px] and changed overflow-y-scroll to overflow-y-auto */
        <div className="absolute top-12 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bg-background dark:bg-black w-[calc(100vw-32px)] md:w-144.25 border p-3 z-20 rounded-lg shadow-lg max-h-[450px] overflow-y-auto">
          {loadingSearchResults ? (
            <div className="p-2">Loading...</div>
          ) : searchOuput?.length === 0 ? (
            <div className="p-2">No Results</div>
          ) : (
            <>
              {searchOuput?.slice(0,5).map((movie) => (
                <div key={movie.id} className="flex flex-col">
                  <div className="flex flex-row">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="w-[67px] h-[100px] shrink-0 rounded-md m-2 p-0 overflow-hidden border"
                    >
                      <Image
                        height={200}
                        width={100}
                        alt={movie.title}
                        src={
                          movie.poster_path
                            ? `${IMAGE_SERVICE_URL}/w500${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-col justify-between w-full px-2 py-2">
                      <div className="flex flex-col">
                        <Link href={`/movie/${movie.id}`}>
                          <p className="hover:underline text-foreground font-semibold text-[20px]">
                            {movie.title}
                          </p>
                        </Link>
                        <div className="flex flex-row gap-1">
                          <Image
                            width={16}
                            height={18}
                            alt="star"
                            src={"/Star.svg"}
                          />
                          <div className="flex flex-row items-baseline">
                            <p className="font-medium text-[14px] text-foreground">
                              {movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : "0.0"}
                            </p>
                            <p className="font-normal text-xs text-[#71717A]">
                              /10
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="text-foreground">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                        <Link
                          href={`/movie/${movie.id}`}
                          className="hover:underline flex flex-row items-center"
                        >
                          <p className="p-2">See More </p>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr className="pt-2" />
                </div>
              ))}

              <Link
                href={`/search?query=${encodeURIComponent(searchInput)}`}
                className="block text-center sticky bottom-0 bg-background dark:bg-black py-2 border-t mt-2"
              >
                <p className="hover:underline text-foreground font-medium">
                  See all results for "{searchInput}"
                </p>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}