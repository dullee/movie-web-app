"use client";
import { useState } from "react";

interface movieProps {
  title: string;
  image: string;
}

export default function Upcoming({}movieProps) {
  return (
    <div className="grid grid-rows-5">
      <div className="flex flex-row justify-between">
        <h1>Upcoming</h1>
        <button>See more</button>
      </div>
      {movies.map((movie) => (
        <Movie title={movie.title} />
      ))}
    </div>
  );
}
