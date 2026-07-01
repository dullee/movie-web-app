"use client";
import { useState } from "react";
import MovieCard from "./movieCard";

interface UpcomingProps {
  movies: Array<{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    // add any other fields MovieCard needs
  }>;
}
export default function Upcoming({ movies }: UpcomingProps) {
  return (
    <div className="flex flex-col px-20">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <h1>Upcoming</h1>
        <button>See more</button>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-5 gap-5">
        {movies.slice(0, 10).map((movie) => (
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
