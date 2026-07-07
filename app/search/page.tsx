"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import MovieCard from "@/app/_components/movieCard";
import { Skeleton } from "@/components/ui/skeleton";
import MovieGenres from "@/app/_components/movieGenres";

export default function Page() {
  const searchParams = useSearchParams();

  // 🚀 1. Extract both parameters from the URL query string
  const searchInput = searchParams.get("query") || "";
  const urlGenreId = searchParams.get("genreId") || "";
  const urlGenreName = searchParams.get("genreName") || "";

  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  // 🚀 2. Automatically sync state selection array if a user lands directly on a genre URL
  useEffect(() => {
    if (urlGenreId) {
      setSelectedGenreIds([Number(urlGenreId)]);
    } else {
      setSelectedGenreIds([]);
    }
  }, [urlGenreId]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let movieApiUrl = "";

        // 🚀 3. DUAL ROUTING LOGIC BASED ON URL CONFIGURATIONS
        if (urlGenreId && !searchInput) {
          // Condition: URL has a genre parameter but no search input text
          movieApiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${urlGenreId}&page=${page}`;
        } else if (searchInput) {
          // Condition: User searched something specific using text
          movieApiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchInput)}&language=en-US&page=${page}`;
        } else {
          // Fallback default: If URL parameters are completely blank, fall back to upcoming
          movieApiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
        }

        const moviesRes = await axios.get(movieApiUrl, { headers });

        setMovies(moviesRes.data.results || []);
        setTotalPages(moviesRes.data.total_pages || 1);
      } catch (error) {
        console.error("Failed fetching movie repository data stream:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchInput, urlGenreId]); // 🚀 Re-run when page, text search, or genre URL parameter updates

  const toggleGenre = (genre: { id: number; name: string }) => {
    if (!genre) return;

    setSelectedGenreIds((prev) =>
      prev.includes(genre.id)
        ? prev.filter((id) => id !== genre.id)
        : [...prev, genre.id],
    );
    console.log("new genre", genre, "all selected", selectedGenreIds);
  };

  const displayedMovies =
    selectedGenreIds.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenreIds.every((id) => movie.genre_ids?.includes(id)),
        );

  return (
    <div className="flex flex-col min-h-screen bg-white text-black px-20">
      <Header />
      <main className="flex-1 w-full pt-32">
        <h1>Search Results</h1>
        {/* Dynamic header updates text depending on your filtering method */}
        <h2>
          {displayedMovies?.length} results for "
          {searchInput || urlGenreName || "All Discoveries"}"
        </h2>

        <div className="flex flex-row gap-5 mt-6">
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-zinc-200 h-[340px] w-[165px] rounded-xl"
                  >
                    <Skeleton className="w-full h-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {displayedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    widthClass="w-[165px]"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="h-auto w-[1px] bg-gray-300" aria-hidden="true" />

          <div className="flex flex-col w-80 shrink-0">
            <h2>Search by genre</h2>
            <h3>See list of movies by genre</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <MovieGenres toggleGenre={toggleGenre} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
