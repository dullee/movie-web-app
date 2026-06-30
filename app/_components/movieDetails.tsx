"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./header";

interface MovieDetailsProps {
  movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<any>(null);
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers,
          },
        );

        setMovie(res.data);
      } catch (error) {
        console.error("failed to fetch movie data", error);
      }
    };
    fetchMovie();
  }, [movieId]);
  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Loading movie details...</p>
      </div>
    );
  }
  console.log(movie);

  return (
    <div className="flex flex-1 ">
      <Header />
      <div className="flex relative p-20 pt-25 flex-col w-full justify-center items-center">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl">{movie.title}</h1>
            <p>{movie.release_date}</p>
          </div>
          <div className="flex flex-col">
            <p>Rating</p>
            <p>{movie.vote_average}</p>
          </div>
        </div>

        <div className="flex flex-row gap-10 max-w-full">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            className="w-auto object-cover"
          />
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
