"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, XIcon } from "lucide-react";
import MovieDetailsSkeleton from "./movieDetailsSkeleton";
import MovieCard from "./movieCard";
import Header from "./header";
import SimilarMovies from "./similarMovies";

interface MovieDetailsProps {
  movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<any>(null);
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [crew, setCrew] = useState<any | null>(null);
  const [actors, setActors] = useState<array | null>(null);

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
        setTrailerKey(officialTrailer.key);
      } catch (error) {
        console.error("failed to fetch movie data", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <MovieDetailsSkeleton />;
  }

  const directors = crew?.filter((member) => member.job === "Director");
  const writers = crew?.filter((member) => member.known_for_department === "Writing");

  console.log("crew",crew);

  console.log("writers", writers);

  return (
    <div className="flex p-20 w-full max-w-6xl mx-auto justify-center items-center">
      {showTrailer && trailerKey ? (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
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
      <div className="flex p-20 pt-25 flex-col w-full justify-center items-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl">{movie.title}</h1>
            <p>{movie.release_date}</p>
          </div>
          <div className="flex flex-col">
            <p>Rating</p>
            <p>{movie.vote_average}</p>
          </div>
        </div>

        <div className="flex gap-10 w-full">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            className="w-auto h-[428px] object-cover"
          />
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => playTrailer()}
              className="absolute bottom-5 left-5 rounded-full"
            >
              <PlayIcon />
            </Button>

            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              className="w-full h-[428px] object-cover cursor-pointer"
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-2">
          {movie.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>
        <p className="w-full">{movie.overview}</p>
        <div className="flex flex-row w-full gap-2">
          <h2 className="pr-5 font-bold">Director</h2>
          {directors.map((director) => (
            <p key={director.id}>{director.name}</p>
          ))}
        </div>
        <div className="flex flex-row w-full gap-2">
          <h2 className="pr-5 font-bold">Writers</h2>
          {writers.slice(0,3).map((writer) => (
            <p key={writer.credit_id}>{writer.name} ·</p>
          ))}
        </div>
        <div className="flex flex-row w-full gap-2">
          <h2 className="pr-5 font-bold">Stars</h2>
          {actors.slice(0, 3).map((actor) => (
            <p key={actor.id}>{actor.name} ·</p>
          ))}
        </div>
        <SimilarMovies movieId={movieId} />
      </div>
    </div>
  );
}
