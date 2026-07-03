"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, XIcon } from "lucide-react";
import MovieDetailsSkeleton from "./movieDetailsSkeleton";
import Footer from "./footer";
import Header from "./header";
import SimilarMovies from "./similarMovies";
import Image from "next/image";

interface MovieDetailsProps {
  movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<any>(null);
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  // 🚀 TypeScript Fix: Changed 'array' to 'any[]'
  const [crew, setCrew] = useState<any[] | null>(null);
  const [actors, setActors] = useState<any[] | null>(null);

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const playTrailer = () => {
    if (trailerKey) setShowTrailer(!showTrailer);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, videoRes, creditsRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            { headers },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            { headers },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            { headers },
          ),
        ]);

        const officialTrailer = videoRes.data.results.find(
          (video: any) => video.site === "YouTube" && video.type === "Trailer",
        );
        setActors(creditsRes.data.cast);
        setCrew(creditsRes.data.crew);
        setMovie(movieRes.data);
        // 🚀 Safeguard: optional chaining fallback if no official trailer key exists
        setTrailerKey(
          officialTrailer
            ? officialTrailer.key
            : videoRes.data.results[0]?.key || null,
        );
      } catch (error) {
        console.error("failed to fetch movie data", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <MovieDetailsSkeleton />;
  }

  const getRating = (forAdult: boolean) => {
    return forAdult ? "R" : "PG";
  };

  const getMovieLength = (length: number) => {
    const hours = Math.round(length / 60);
    const minutes = Math.round(length % (length / 60));
    return `${hours}h ${minutes}m`;
  };

  const directors = crew?.filter((member) => member.job === "Director") || [];
  const writers =
    crew?.filter((member) => member.known_for_department === "Writing") || [];

  return (
    <div className="flex flex-col min-h-screen relative">
      {showTrailer && trailerKey ? (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video  rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/80 transition text-white z-10"
            >
              <XIcon />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
      <Header />
      <div className="flex p-20 pt-25 flex-col w-full max-w-6xl mx-auto justify-center items-center gap-8">
        <div className="flex justify-between w-full items-end   pb-4">
          <div className="flex flex-col gap-1 text-black">
            <h1 className="text-4xl  font-extrabold tracking-tight">
              {movie.title}
            </h1>
            <p className=" text-sm">
              {movie.release_date.replaceAll("-", ".")} ·{" "}
              {getRating(movie.adult)} · {getMovieLength(movie.runtime)}
            </p>
          </div>
          <div className="flex flex-col text-black items-end">
            <p className="text-xs  uppercase font-semibold">Rating</p>
            <p className="text-2xl font-bold text-yellow-500">
              {Math.round(movie.vote_average * 10) / 10}
              <span className="text-sm text-zinc-500">/10</span>
            </p>
            <p>{movie.vote_count}</p>
          </div>
        </div>

        <div className="flex gap-10 w-full items-start">
          <Image
            width={290}
            height={428}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            className="rounded-xl object-cover shadow-lg border  shrink-0"
            alt={movie.title}
          />
          <div className="relative flex-1 group rounded-xl overflow-hidden border  h-[428px]">
            <Button
              variant="outline"
              size="icon"
              onClick={() => playTrailer()}
              className="absolute bottom-5 left-5 rounded-full z-10 bg-white text-black hover:bg-zinc-200"
              disabled={!trailerKey}
            >
              <PlayIcon className="fill-black" />
            </Button>

            <Image
                width={760}
                height={428}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              alt={movie.title}
            />
          </div>
        </div>

        {/* Badges Array */}
        <div className="flex w-full flex-wrap gap-2 justify-start">
          {movie.genres?.map((genre: any) => (
            <Badge key={genre.id} variant="secondary" className="px-3 py-1  ">
              {genre.name}
            </Badge>
          ))}
        </div>

        {/* Text Details & Credits Column */}
        <div className="w-full text-black leading-relaxed text-sm max-w-3xl mr-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold  mb-2">Overview</h3>
            <p>{movie.overview}</p>
          </div>

          {/* Credits Block Meta layout alignment */}
          <div className="space-y-3  pt-6">
            <div className="flex items-center border-b gap-2">
              <h2 className="w-20 font-bold  shrink-0">Director</h2>
              <div className="flex flex-wrap gap-2 ">
                {directors.map((director) => (
                  <span key={director.id}>{director.name}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center border-b gap-2">
              <h2 className="w-20 font-bold  shrink-0">Writers</h2>
              <div className="flex flex-wrap gap-1 ">
                {writers.slice(0, 3).map((writer, index) => (
                  <span key={writer.credit_id}>
                    {writer.name}
                    {index < Math.min(writers.slice(0, 3).length, 3) - 1
                      ? " · "
                      : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center border-b gap-2">
              <h2 className="w-20 font-bold  shrink-0">Stars</h2>
              <div className="flex flex-wrap gap-1 ">
                {actors &&
                  actors.slice(0, 3).map((actor, index) => (
                    <span key={actor.id}>
                      {actor.name}
                      {index < 2 ? " · " : ""}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-black">
          <SimilarMovies movieId={movieId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
