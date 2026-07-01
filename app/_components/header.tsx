"use client ";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Header() {
  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [searchInput, setSearchInput] = useState("");
  const [searchOuput, setSearchOutput] = useState([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

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
      console.log(res.data);

      setSearchOutput(res.data.results);
      setLoadingSearchResults(false);
    };
    searchMovies();
  };
  return (
    <div className="fixed top-0 flex flex-row justify-between w-full px-20 pt-5 pb-9 z-10">
      <Link href="/">
        <div>Movie Z</div>
      </Link>

      <div className="flex flex-row gap-5 relative">
        <p className="border p-2 cursor-pointer">Genre</p>
        <input
          className="border"
          placeholder="Search.."
          onChange={(e) => {
            changeSearchInput(e.target.value);
          }}
        />
        {searchInput ? (
          <div className="absolute top-11 right-0 border p-5 z-20 min-w-[200px]">
            {searchOuput.length === 0 ? (
              loadingSearchResults ? (
                <div>Loading</div>
              ) : (
                <div>No results</div>
              )
            ) : (
              searchOuput.slice(0, 5).map((movie) => (
                <div key={movie.id} className="py-1 hover:bg-zinc-800">
                  {movie.title}
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>

      <button className="cursor-pointer border">Dark mode</button>
    </div>
  );
}
