"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Upcoming from "./_components/upcoming";

export default function Home() {
  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  const [searchInput, setSearchInput] = useState("");
  const [searchOuput, setSearchOutput] = useState([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [popularMovies, setPopularMovies] = useState<any[]>(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const [nowPlayingRes, upcomingRes, popularRes] = await Promise.all([
        axios.get(`${BASE_API}/movie/now_playing?language=en-US&page=${page}`, {
          headers,
        }),
        axios.get(`${BASE_API}/movie/upcoming?language=en-US&page=${page}`, {
          headers,
        }),
        axios.get(`${BASE_API}/movie/popular?language=en-US&page=${page}`, {
          headers,
        }),
      ]);
      setNowPlayingMovies(nowPlayingRes.data.results || []);
      setUpcomingMovies(upcomingRes.data.results || []);
      setPopularMovies(popularRes.data.results || []);
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

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
        `${BASE_API}/search/movie?query=${newValue}&language=en-US&page=${page}`,
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
    <div className="flex flex-col flex-1 bg-zinc-50  dark:bg-black relative">
      <Header></Header>
      <div className="flex flex-row gap-5 pt-25 overflow-x-auto w-full">
        {nowPlayingMovies.map((movie) => (
          <li
            key={movie.id}
            className="list-none shrink-0 w-screen text-white max-h-[600px] flex flex-col gap-2 relative"
          >
            <Image
              alt={movie.title}
              width={1000}
              height={600}
              className="h-[600px] object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            />
            <div className="absolute top-1/3 left-1/8 max-w-1/4">
              {" "}
              <p>Now Playing:</p>
              <p className="text-4xl font-extrabold">{movie.title}</p>
              <div className="flex flex-row">
                <p>{Math.round(movie.vote_average * 10) / 10}</p>
                <p className="text-[#71717A]">/10</p>
              </div>
              <p className="max-w-4/5 text-xs py-4">{movie.overview}</p>
              <button className="rounded-md text-black px-4 py-3 bg-[#F4F4F5] cursor-pointer">
                {" "}
                Watch Trailer
              </button>
            </div>
          </li>
        ))}
      </div>
      <div className="flex flex-col justify-around">
        <Upcoming movies={upcomingMovies} />
        <Upcoming movies={upcomingMovies} />
      </div>
      <Footer />
    </div>
  );
}
