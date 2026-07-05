"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

export default function MovieCard({
  movie,
  widthClass = "w-[230px]",
}: {
  movie: any;
  widthClass?: string;
}) {
  if (!movie || !movie.id) {
    return null;
  }
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card
        className={`flex flex-col ${widthClass} bg-[#F4F4F5] text-black rounded-xl cursor-pointer overflow-hidden transition-transform hover:scale-102 duration-300`}
      >
        <div className="flex w-full h-[340px] items-center justify-center">
          <Image
            alt={movie.title}
            width={500}
            height={340}
            className=" object-cover w-auto h-auto"
            src={`${IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
          />
        </div>
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
