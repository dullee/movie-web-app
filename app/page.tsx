"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Upcoming from "./_components/upcoming";
import MovieCarousel from "./_components/movieCarousel";
import MovieCarouselSkeleton from "./_components/movieCarouselSkeleton";

export default function Home() {
  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  const [searchInput, setSearchInput] = useState("");
  const [searchOuput, setSearchOutput] = useState<any[]>([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingRes, upcomingRes, popularRes] = await Promise.all([
          axios.get(
            `${BASE_API}/movie/now_playing?language=en-US&page=${page}`,
            { headers },
          ),
          axios.get(`${BASE_API}/movie/upcoming?language=en-US&page=${page}`, {
            headers,
          }),
          axios.get(`${BASE_API}/movie/popular?language=en-US&page=${page}`, {
            headers,
          }),
        ]);

        setNowPlayingMovies(nowPlayingRes.data.results || []);
        // setUpcomingMovies(upcomingRes.data.results || []);
        setPopularMovies(popularRes.data.results || []);
      } catch (error) {
        console.error("Failed to load home page sections", error);
      } finally {
        setLoading(false);
      }
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
      {loading ? (
        <MovieCarouselSkeleton />
      ) : (
        <MovieCarousel movies={nowPlayingMovies} />
      )}
      <div className="flex flex-col items-center bg-white">
        <Upcoming movies={upcomingMovies} loading={loading} />
      </div>
      <Footer />
    </div>
  );
}
