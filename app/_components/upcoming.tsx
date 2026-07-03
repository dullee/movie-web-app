"use client";
import { useState } from "react";
import MovieCard from "./movieCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Upcoming({
  movies,
  loading,
}: {
  movies: any[];
  loading: boolean;
}) {

  return (
    <div className="flex flex-col max-w-[1440px] bg-white">
      {loading ? (
        <div className="flex flex-row justify-between pt-13 pb-8">
          <Skeleton className="bg-[#F4F4F5] rounded-md text-[#F4F4F5]">Upcoming</Skeleton>
          <Skeleton className="bg-[#F4F4F5] rounded-md text-[#F4F4F5]">See more</Skeleton>
        </div>
      ) : (
        <div className="flex flex-row justify-between pt-13 pb-8">
          <h1>Upcoming</h1>
          <button>See more</button>
        </div>
      )}

      <div className="grid grid-cols-1  md:grid-cols-5 gap-5">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} loading={loading} />
        ))}
      </div>
    </div>
  );
}
