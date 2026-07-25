"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import MovieCard from "@/app/_components/movieCard";
import { Skeleton } from "@/components/ui/skeleton";
import MovieGenres from "@/app/_components/movieGenres";
import MoviePagination from "../_components/pagination";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchInput = searchParams.get("query") || "";
  // Get genreId parameter (e.g. "28|12" or "28,12")
  const urlGenreIds = searchParams.get("genreId") || "";
  const currentPage = Number(searchParams.get("page") || 1);

  // Parse active genre IDs into an array of numbers
  const selectedGenreIds = urlGenreIds
    ? urlGenreIds.split(/[,|]/).map(Number)
    : [];

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let movieApiUrl = "";

        // 1. Search Query taking precedence
        if (searchInput) {
          movieApiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchInput,
          )}&language=en-US&page=${currentPage}`;
        }
        // 2. Discover endpoint with multiple stacked genre IDs
        else if (urlGenreIds) {
          movieApiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${encodeURIComponent(
            urlGenreIds,
          )}&page=${currentPage}`;
        }
        // 3. Fallback
        else {
          movieApiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`;
        }

        const moviesRes = await axios.get(movieApiUrl, { headers });
        let results = moviesRes.data.results || [];

        // If user searched AND selected genres, filter results locally
        if (searchInput && selectedGenreIds.length > 0) {
          results = results.filter((movie: any) =>
            selectedGenreIds.some((id) => movie.genre_ids?.includes(id)),
          );
        }

        setMovies(results);
        const cappedPages =
          moviesRes.data.total_pages > 500 ? 500 : moviesRes.data.total_pages;
        setTotalPages(cappedPages || 1);
      } catch (error) {
        console.error("Failed fetching movie repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchInput, urlGenreIds]);

  const toggleGenre = (genre: { id: number; name: string }) => {
    if (!genre) return;

    const params = new URLSearchParams(searchParams.toString());
    let currentIds = selectedGenreIds;

    if (currentIds.includes(genre.id)) {
      currentIds = currentIds.filter((id) => id !== genre.id);
    } else {
      currentIds = [...currentIds, genre.id];
    }

    if (currentIds.length > 0) {
      params.set("genreId", currentIds.join("|"));
    } else {
      params.delete("genreId");
      params.delete("genreName");
    }
    if (!searchInput) {
      params.delete("query");
    }
    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  return (
    <main className="flex-1 w-full pt-32 px-20">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <h2 className="text-zinc-500 text-sm mt-1">
        {movies?.length || 0} results for "
        {searchInput ||
          (selectedGenreIds.length
            ? `${selectedGenreIds.length} genres selected`
            : "All Discoveries")}
        "
      </h2>

      <div className="flex flex-row gap-8 mt-6">
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-100 dark:bg-zinc-800 h-85 w-full rounded-xl p-2 space-y-3"
                >
                  <Skeleton className="w-full h-60 rounded-lg" />
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-3/4 h-5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} widthClass="w-full" />
              ))}
            </div>
          )}
        </div>

        <div
          className="h-auto w-px bg-gray-200 dark:bg-zinc-800"
          aria-hidden="true"
        />

        <div className="flex flex-col w-80 shrink-0">
          <h2 className="font-bold text-lg">Search by genre</h2>
          <h3 className="text-zinc-400 text-xs mb-4">
            See list of movies by genre
          </h3>
          <div className="flex flex-wrap gap-2">
            <MovieGenres
              toggleGenre={toggleGenre}
              selectedGenreIds={selectedGenreIds}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-12 pb-6">
        <MoviePagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:text-white dark:bg-black">
      <Header />
      <Suspense
        fallback={
          <div className="p-20 text-center">Loading search results...</div>
        }
      >
        <SearchPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
