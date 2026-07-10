"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="relative">
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
            <div className="absolute top-11 translate-x-1/5 bg-white w-144.25 border p-5 z-20 min-w-50 overflow-scroll ">
              {loadingSearchResults ? (
                <div>Loading...</div>
              ) : searchOuput?.length === 0 ? (
                <div>No Results</div>
              ) : (
                <>
                  {searchOuput?.slice(0, 5).map((movie) => (
                    <div key={movie.id} className="flex flex-row border-b pb-5">
                      <Link href={`/movie/${movie.id}`}>
                        <Card>
                          <Image
                            height={300}
                            width={200}
                            alt={movie.title}
                            src={`${IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                            className="w-20"
                          />
                        </Card>
                      </Link>
                      <div className="flex justify-between w-full px-5 py-2">
                        <div className="flex flex-col">
                          <Link href={`/movie/${movie.id}`}>
                            <p className="hover:underline">{movie.title}</p>
                          </Link>

                          <p>{Math.round(movie.vote_average * 10) / 10}/10</p>
                          <p>{movie.release_date?.slice(0, 4)}</p>
                        </div>
                        <Link
                          href={`/movie/${movie.id}`}
                          className="hover:underline"
                        >
                          See More
                        </Link>
                      </div>
                      <hr></hr>
                    </div>
                  ))}

                  <Link
                    href={`/search?query=${encodeURIComponent(searchInput)}`}
                  >
                    <p className="hover:underline pt-5">
                      {" "}
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
