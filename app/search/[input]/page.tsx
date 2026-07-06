"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import MovieCard from "@/app/_components/movieCard";
import { Skeleton } from "@/components/ui/skeleton";
import MovieGenres from "@/app/_components/movieGenres";

export default function Page() {
  const params = useParams<{ input: string }>();
  const [searchInput, setSearchInput] = useState<string>(params?.input);

  const [genreIds, setGenreId] = useState<any[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const [movies, setMovies] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [moviesRes, genreIdRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US&page=${page}`,
            { headers },
          ),
          axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?language=en`,
            { headers },
          ),
        ]);
        setMovies(moviesRes.data.results || []);
        setTotalPages(moviesRes.data.total_pages || 1);
        setGenreId(genreIdRes.data.genres);
      } catch (error) {
        console.error("Failed fetching upcoming view:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const toggleGenre = (genreName: string) => {
    const genre = genreIds.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase(),
    );
    if (!genre) return;

    setSelectedGenreIds((prev) =>
      prev.includes(genre.id)
        ? prev.filter((id) => id !== genre.id)
        : [...prev, genre.id],
    );
  };
  const displayedMovies =
    selectedGenreIds.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenreIds.some((id) => movie.genre_ids?.includes(id)),
        );

  return (
    <div className="flex flex-col min-h-screen bg-white text-black px-20">
      <Header />
      <h1 className="pt-50">Search Results</h1>
      <h2>
        {displayedMovies?.length} results for "{searchInput}" {selectedGenreIds}
      </h2>
      <div className="flex flex-row gap-5">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-zinc-200 h-[340px] w-[165px] rounded-xl"
              >
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} widthClass="w-[165px]" />
            ))}
          </div>
        )}
        <div className="h-full w-[1px] bg-gray-300" aria-hidden="true" />
        <div className="flex flex-col">
           <h2>Search by genre</h2>
          <h3>See list of movies by genre</h3>
          <div className="grid grid-cols-3 gap-4 h-20">
            <MovieGenres toggleGenre={toggleGenre} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
