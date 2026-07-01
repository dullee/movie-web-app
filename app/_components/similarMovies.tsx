"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./movieCard";

interface MovieDetailsProps {
  movieId: number;
}

export default function SimilarMovies({ movieId }: MovieDetailsProps) {
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [similarMovies, setSimilarMovies] = useState<array | null>(null);

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
        <h1>More Like this</h1>
        <button>See more</button>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-5 gap-5">
        {similarMovies.slice(0, 5).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
