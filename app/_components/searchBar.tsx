"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import Image from "next/image";

export default function SearchBar({}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchOuput, setSearchOutput] = useState<any[] | null>([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

  const changeSearchInput = (newValue: string) => {
    setSearchInput(newValue);
    setLoadingSearchResults(true);
    const searchMovies = async () => {
      if (!newValue) {
        setSearchOutput([]);
        setLoadingSearchResults(false);
        return;
      }
      const res = await axios.get(
        `${BASE_API}/search/movie?query=${newValue}&language=en-US&page=1`,
        {
          headers,
        },
      );
      console.log("search outpu", res.data.results);

      setSearchOutput(res.data.results);
      setLoadingSearchResults(false);
    };
    searchMovies();
  };

  return (
    <div>
      <input
        className="border"
        placeholder="Search.."
        onChange={(e) => {
          changeSearchInput(e.target.value);
        }}
      />
      {searchInput ? (
        <div className="absolute top-11 -translate-x-1/2 bg-white w-[577px] border p-5 z-20 min-w-[200px] overflow-scroll gap-5">
          {searchOuput?.length === 0 ? (
            loadingSearchResults ? (
              <div>Loading</div>
            ) : (
              <div>No results</div>
            )
          ) : (
            searchOuput?.slice(0, 5).map((movie) => (
              <div key={movie.id} className="flex flex-row">
                <Image
                  height={300}
                  width={200}
                  alt={movie.title}
                  src={`${IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                  className="w-20"
                />
                <div className="flex justify-between w-full px-5 py-2">
                  <div className="flex flex-col ">
                    <p>{movie.title}</p>
                    <p>{Math.round(movie.vote_average * 10) / 10}/10</p>
                    <p>{movie.release_date.slice(0, 4)}</p>
                  </div>
                  <button>See More</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
