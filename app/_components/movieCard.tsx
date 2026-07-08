"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
  };
  widthClass?: string;
}

export default function MovieCard({
  movie,
  widthClass = "w-[230px]",
}: MovieCardProps) {
  if (!movie || !movie.id) return null;

  const posterSrc = `${IMAGE_SERVICE_URL}/w342${movie.poster_path}`;

  const rating = movie.vote_average
    ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
    : "0.0";

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <Card
        className={`flex flex-col ${widthClass} bg-[#F4F4F5] dark:bg-zinc-900 text-black dark:text-white rounded-xl cursor-pointer overflow-hidden transition-transform hover:scale-[1.02] duration-300 border-none`}
      >
        <div className="relative w-full aspect-2/3 bg-zinc-200 dark:bg-zinc-800">
          <Image
            alt={movie.title || "Movie Poster"}
            src={posterSrc}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 230px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <CardContent className="p-3 flex flex-col flex-1 justify-between gap-1">
          <div className="flex items-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <span className="text-amber-500 font-bold mr-0.5">★</span>
            <p className="text-black dark:text-white">{rating}</p>
            <span>/10</span>
          </div>

          <CardTitle className="text-sm font-bold truncate" title={movie.title}>
            {movie.title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
