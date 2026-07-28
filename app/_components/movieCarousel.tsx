"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import MovieTrailerPlayer from "./movieTrailerPlayer";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MovieCarousel({ movies }: { movies: any[] }) {
  const [activeTrailerId, setActiveTrailerId] = useState<number | null>(null);

  const closeTrailer = () => {
    setActiveTrailerId(null);
  };

  return (
    <Carousel className="w-full relative flex h-[600xp] md:pt-25 pt-14.75 dark:bg-black">
      <CarouselContent>
        {movies?.slice(0, 3).map((movie, index) => (
          <CarouselItem key={index} className="flex justify-center ">
            {activeTrailerId === movie.id && (
              <MovieTrailerPlayer movieId={movie.id} onClose={closeTrailer} />
            )}

            <Card className="flex justify-center p-0 rounded-none">
              <CardContent className="flex flex-col items-center max-w-360 relative justify-center p-0 bg-background dark:bg-black">
                {index > 0 && (
                  <CarouselPrevious className="hidden md:inline-flex xl:left-10 left-5 xl:p-5 bg-white text-black border-none hover:bg-black/80 hover:text-white transition" />
                )}

                <Link href={`/movie/${movie.id}`}>
                  <Image
                    alt={movie.title}
                    width={1440}
                    height={600}
                    loading="eager"
                    className="xl:h-150 xl:object-cover object-scale-down"
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  />
                </Link>

                <div className="md:absolute flex flex-col md:top-1/3 left-1/8 xl:max-w-1/4 p-5 md:max-w-1/2 text-black dark:text-white md:text-white">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="">Now Playing:</p>
                      <p className="md:text-4xl text-2xl font-extrabold">
                        {movie.title}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-1">
                      <Image
                        className="py-2"
                        width={28}
                        height={28}
                        alt="star"
                        src={"/Star.svg"}
                      />
                      <div className="flex flex-row items-center pt-1">
                        <p className="font-semibold text-lg">
                          {Math.round(movie.vote_average * 10) / 10}
                        </p>
                        <span className="text-base font-normal text-[#71717A]">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="md:max-w-4/5 text-xs py-4">{movie.overview}</p>

                  {/* 3. Set the active ID when clicked */}
                  <Button
                    onClick={() => setActiveTrailerId(movie.id)}
                    disabled={activeTrailerId === movie.id}
                    className="rounded-md px-4 py-3 h-fit md:w-auto w-36.25 md:text-black text-white bg-black dark:bg-[#18181B] md:dark:bg-white border-none hover:text-white md:bg-[#F4F4F5]"
                  >
                    <PlayIcon />
                    <span>Watch Trailer</span>
                  </Button>
                </div>
                {index < 2 && (
                  <CarouselNext className=" hidden md:inline-flex md:right-10 right-5 md:p-5 bg-white text-black hover:bg-black/80 hover:text-white transition" />
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
