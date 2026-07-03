"use client";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import MovieCardSkeleton from "./moveCardSkeleton";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

export default function MovieCard({
  movie,
  loading,
}: {
  movie: any;
  loading: boolean;
}) {
  if (loading || !movie) {
    return <MovieCardSkeleton />;
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="flex flex-col bg-[#F4F4F5] rounded-xl cursor-pointer overflow-hidden">
        <img
          className="w-full object-cover"
          src={`${IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
        />
        <CardContent className="p-2">
          <div className="flex">
            <p>{Math.round(movie.vote_average * 10) / 10}</p>
            <span>/10</span>
          </div>

          <CardTitle className="overflow-hidden">{movie.title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
