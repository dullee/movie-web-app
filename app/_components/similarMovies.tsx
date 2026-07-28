"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./movieCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MovieDetailsProps {
  movieId: number;
}

export default function SimilarMovies({ movieId }: MovieDetailsProps) {
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const similarMoviesRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
          { headers },
        );

        console.log("similar", similarMoviesRes);
        setSimilarMovies(similarMoviesRes.data.results);
      } catch (error) {
        console.error("failed to fetch movie data", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row  justify-between pt-13 pb-8">
        <h1 className="font-semibold text-2xl">More Like this</h1>
        <Link href={`/more_like_this?id=${movieId}`}>
          <button className="text-[14px] font-medium flex flex-row items-center gap-2 cursor-pointer">
            See more
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-1 md:grid-cols-5 gap-4 w-full">
        {similarMovies?.slice(0, 5).map((movie, index) => (
          <div key={movie.id} className={index >= 2 ? "hidden md:block": "block"}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
