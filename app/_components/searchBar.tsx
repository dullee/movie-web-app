"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <div className="relative w-[379px]">
      <InputGroup className="max-w-xs">
        <InputGroupInput
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <InputGroupAddon>
          {searchInput && (
            <div className="absolute top-11 translate-x-1/5 bg-background text-foreground  dark:bg-black w-144.25 border p-3 z-20 min-w-50 rounded-lg">
              {loadingSearchResults ? (
                <div>Loading...</div>
              ) : searchOuput?.length === 0 ? (
                <div>No Results</div>
              ) : (
                <>
                  {searchOuput?.slice(0, 5).map((movie) => (
                    <div key={movie.id} className="flex flex-col ">
                      <div className="flex flex-row">
                        <Link
                          href={`/movie/${movie.id}`}
                          className="w-[67px] h-[100px] shrink-0 rounded-md m-2 p-0 overflow-hidden border"
                        >
                          <Image
                            height={200}
                            width={100}
                            alt={movie.title}
                            src={`${IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
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
                                  {Math.round(movie.vote_average * 10) / 10}
                                </p>
                                <p className="font-normal text-xs text-[#71717A]">
                                  /10
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <p>{movie.release_date?.slice(0, 4)}</p>
                            <Link
                              href={`/movie/${movie.id}`}
                              className="hover:underline  flex flex-row items-center"
                            >
                              <p className="p-2">See More </p>
                              <ArrowRightIcon size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <hr className="pt-2"></hr>
                    </div>
                  ))}

                  <Link
                    href={`/search?query=${encodeURIComponent(searchInput)}`}
                  >
                    <p className="hover:underline py-[10px]">
                      See all results for "{searchInput}"
                    </p>
                  </Link>
                </>
              )}
            </div>
          )}
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
