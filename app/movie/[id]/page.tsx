"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import MovieDetailsSkeleton from "@/app/_components/movieDetailsSkeleton";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import SimilarMovies from "@/app/_components/similarMovies";
import Image from "next/image";
import MovieTrailerPlayer from "@/app/_components/movieTrailerPlayer";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params?.id);

  const [movie, setMovie] = useState<any>();
  const [loading, setLoading] = useState(true);
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [crew, setCrew] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);

  const [showTrailer, setShowTrailer] = useState(false);

  const [trailerKey, setTrailerKey] = useState<string>("");

  const [trailerDuration, setTrailerDuration] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, creditsRes, videoRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers,
          }),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            { headers },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            { headers },
          ),
        ]);
        setActors(creditsRes.data.cast);
        setCrew(creditsRes.data.crew);
        setMovie(movieRes.data);

        const officialTrailer = videoRes.data.results.find(
          (video: any) => video.site === "YouTube" && video.type === "Trailer",
        );

        setTrailerKey(officialTrailer?.key);

        const video = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${officialTrailer?.key}&key=AIzaSyBbpMOdNww_g1_7ETv3-kmaoatefyJ5JxU`,
        );

        const videoDurationIso = video.data.items[0]?.contentDetails.duration;

        setTrailerDuration(
          videoDurationIso?.replace(
            /PT(\d+)M(\d+)S/,
            (match: string, m: string, s: string): string =>
              `${m}:${s.padStart(2, "0")}`,
          ),
        );
      } catch (error) {
        console.error("failed to fetch movie data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading || !movie) {
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

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {showTrailer && (
        <MovieTrailerPlayer movieId={movie.id} onClose={closeTrailer} />
      )}

      <Header />
      <div className="flex md:max-w-360 md:px-45 pt-22.5 md:pt-25 flex-col w-full max-w-6xl mx-auto justify-center items-center md:gap-8">
        <div className="flex justify-between w-full items-end md:px-0 px-5   pb-4">
          <div className="flex flex-col gap-1 dark:text-white">
            <h1 className="md:text-4xl text-2xl font-semibold md:font-extrabold tracking-tight">
              {movie.title}
            </h1>
            <p className=" text-sm">
              {movie.release_date.replaceAll("-", ".")} ·{" "}
              {getRating(movie.adult)} · {getMovieLength(movie.runtime)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs  uppercase font-semibold md:inline-flex hidden">
              Rating
            </p>
            <div className="flex flex-row">
              <Image
                width={28}
                height={28}
                loading={"eager"}
                alt="star"
                src={"/Star.svg"}
                className="w-7 h-7"
              />
              <div>
                <p className="md:text-2xl text-[14px] font-bold">
                  {(movie.vote_average ?? 0).toFixed(1)}
                  <span className="md:text-sm text-[14px] text-zinc-500">
                    /10
                  </span>
                </p>
                <p className="#71717A">{movie.vote_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-10 w-full items-start ">
          <div className="flex flex-row px-5 gap-8.5 md:px-0">
            <Image
              width={290}
              height={428}
              loading="eager"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="md:rounded-sm object-cover shadow-lg md:border shrink-0 w-25 h-37 md:h-107 md:w-72.5"
              alt={movie.title}
            />
            <div className="flex flex-col md:hidden gap-5">
              <div className="flex w-full flex-wrap gap-2  justify-start">
                {movie.genres?.map((genre: any) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="px-3 py-1  "
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="w-full leading-relaxed text-sm max-w-3xlmr-auto space-y-6">
                <div>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex-1 group md:rounded-sm overflow-hidden md:border  h-107">
            <div className="absolute bottom-5 left-5 flex flex-row items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowTrailer(!showTrailer)}
                disabled={showTrailer}
                className="  w-10 h-10 rounded-full z-5 bg-white hover:bg-zinc-200"
              >
                <PlayIcon className="fill-black" />
              </Button>
              <p className="text-white">Play Trailer</p>
              <p>{trailerDuration}</p>
            </div>

            <Image
              width={760}
              height={428}
              loading="eager"
              src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              alt={movie.title}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start w-full ">
          <div className="hidden md:flex flex-col w-full gap-5">
            <div className="flex w-full flex-wrap gap-2 md:px-0 px-5 justify-start">
              {movie.genres?.map((genre: any) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="px-3 py-1  "
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="w-full leading-relaxed text-sm max-w-3xl md:px-0 px-5 mr-auto space-y-6">
              <div>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 px-5 md:px-0 pt-6">
            <div className="flex items-center border-b pb-2 gap-2">
              <h2 className="w-20 font-bold  shrink-0">Director</h2>
              <div className="flex flex-wrap gap-2 ">
                {directors.map((director, index) => (
                  <span key={index}>{director.name}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center border-b pb-2  gap-2">
              <h2 className="w-20 font-bold  shrink-0">Writers</h2>
              <div className="flex flex-wrap gap-1 ">
                {writers.slice(0, 3).map((writer, index) => (
                  <span key={index}>
                    {writer.name}
                    {index < Math.min(writers.slice(0, 3).length, 3) - 1
                      ? " · "
                      : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center border-b pb-2  gap-2">
              <h2 className="w-20 font-bold  shrink-0">Stars</h2>
              <div className="flex flex-wrap gap-1 ">
                {actors &&
                  actors.slice(0, 3).map((actor, index) => (
                    <span key={index}>
                      {actor.name}
                      {index < 2 ? " · " : ""}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:px-0 px-5">
          <SimilarMovies movieId={id} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
