"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MovieCarousel({ movies }: { movies: any[] }) {
  return (
    <Carousel className="w-full relative flex h-[600xp] pt-25 bg-white">
      <CarouselContent className="">
        {movies?.map((movie) => (
          <CarouselItem key={movie.id} className="flex justify-center ">
            <Card className="flex justify-center p-0 rounded-none">
              <CardContent className="flex items-center max-w-[1440px] relative justify-center p-0">
                <CarouselPrevious className="left-10 bg-black/50 text-white border-zinc-700 hover:bg-black/80 hover:text-white transition" />

                <Image
                  alt={movie.title}
                  width={1440}
                  height={600}
                  className="h-[600px] object-cover"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
                <div className="absolute top-1/3 left-1/8 max-w-1/4 text-white">
                  <p className="">Now Playing:</p>
                  <p className="text-4xl font-extrabold">{movie.title}</p>
                  <div className="flex flex-row">
                    <p>{Math.round(movie.vote_average * 10) / 10}</p>
                    <p className="text-[#71717A]">/10</p>
                  </div>
                  <p className="max-w-4/5 text-xs py-4">{movie.overview}</p>
                  <button className="absolute rounded-md text-black px-4 py-3 bg-[#F4F4F5] cursor-pointer">
                    Watch Trailer
                  </button>
                </div>
                <CarouselNext className="right-10 bg-black/50 text-white border-zinc-700 hover:bg-black/80 hover:text-white transition" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
