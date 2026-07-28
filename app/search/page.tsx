"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useMemo } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import MovieCard from "@/app/_components/movieCard";
import { Skeleton } from "@/components/ui/skeleton";
import MovieGenres from "@/app/_components/movieGenres";
import MoviePagination from "@/app/_components/pagination";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchInput = searchParams.get("query") || "";
  const urlGenreIds = searchParams.get("genreId") || "";
  const currentPage = Number(searchParams.get("page") || 1);

  const selectedGenreIds = useMemo(() => {
    return urlGenreIds ? urlGenreIds.split(/[,|]/).map(Number) : [];
  }, [urlGenreIds]);

  const [movies, setMovies] = useState<any[]>([]);
  const [genresList, setGenresList] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [rawTotalResults, setRawTotalResults] = useState(0);

  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = useMemo(
    () => ({ Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` }),
    [API_READ_ACCESS_TOKEN],
  );

  // 1. Fetch official TMDB genre list once on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          { headers },
        );
        setGenresList(res.data.genres || []);
      } catch (error) {
        console.error("Failed fetching genre list:", error);
      }
    };

    fetchGenres();
  }, [headers]);

  // 2. Convert selected genre IDs to a readable string (e.g., "Action, Comedy")
  const genreNames = useMemo(() => {
    if (selectedGenreIds.length === 0 || genresList.length === 0) return "";
    return genresList
      .filter((g) => selectedGenreIds.includes(g.id))
      .map((g) => g.name)
      .join(", ");
  }, [selectedGenreIds, genresList]);

  // 3. Fetch movies based on current search params
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let movieApiUrl = "";

        // TMDB uses commas (,) for AND logic in discover queries
        const genreQueryParam = selectedGenreIds.join(",");

        if (searchInput) {
          movieApiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchInput,
          )}&language=en-US&page=${currentPage}`;
        } else if (selectedGenreIds.length > 0) {
          movieApiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${encodeURIComponent(
            genreQueryParam,
          )}&page=${currentPage}`;
        } else {
          movieApiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`;
        }

        const moviesRes = await axios.get(movieApiUrl, { headers });
        let results = moviesRes.data.results || [];

        let calculatedTotalResults =
          moviesRes.data.total_results || results.length;
        let calculatedTotalPages = moviesRes.data.total_pages || 1;

        // Filter search results so only movies containing ALL selected genres are kept
        if (searchInput && selectedGenreIds.length > 0) {
          results = results.filter((movie: any) =>
            selectedGenreIds.every((id) => movie.genre_ids?.includes(id)),
          );

          // Update counts based on filtered subset
          calculatedTotalResults = results.length;
          calculatedTotalPages = Math.ceil(results.length / 20) || 1;
        }

        setMovies(results);

        const cappedPages =
          calculatedTotalPages > 500 ? 500 : calculatedTotalPages;
        setTotalPages(cappedPages || 1);

        setRawTotalResults(calculatedTotalResults);
      } catch (error) {
        console.error("Failed fetching movie repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchInput, urlGenreIds, selectedGenreIds, headers]);

  // 4. Cap display count at max paginated items (500 pages * 20 items = 10,000 max)
  const displayTotalResults = useMemo(() => {
    const maxPaginatedCount = totalPages * 20;
    return Math.min(rawTotalResults, maxPaginatedCount);
  }, [rawTotalResults, totalPages]);

  const toggleGenre = (genre: { id: number; name: string }) => {
    if (!genre) return;

    const params = new URLSearchParams(searchParams.toString());
    let currentIds = [...selectedGenreIds];

    if (currentIds.includes(genre.id)) {
      currentIds = currentIds.filter((id) => id !== genre.id);
    } else {
      currentIds.push(genre.id);
    }

    if (currentIds.length > 0) {
      params.set("genreId", currentIds.join(","));
    } else {
      params.delete("genreId");
      params.delete("genreName");
    }

    // Preserve query string if present
    if (searchInput) {
      params.set("query", searchInput);
    } else {
      params.delete("query");
    }

    // Reset pagination to page 1 on filter toggle
    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  const hasGenresSelected = selectedGenreIds.length > 0;

  // Header Title Builder
  const getHeaderTitle = () => {
    if (searchInput && hasGenresSelected) {
      return `${displayTotalResults} results for "${searchInput}" in "${genreNames}"`;
    }
    if (hasGenresSelected) {
      return `${displayTotalResults} titles in "${genreNames || "Selected Genres"}"`;
    }
    return `${displayTotalResults} results for "${searchInput || "All Discoveries"}"`;
  };

  return (
    <main className="flex-1 max-w-360 w-full pt-22.5 md:pt-32 px-5 md:px-20">
      <h1 className="text-2xl font-bold">
        {hasGenresSelected || searchInput ? "Search Filter" : "Search Results"}
      </h1>

      {/* Mobile Subheader */}
      <h2 className="text-zinc-500 text-sm mt-1 mb-6 md:hidden">
        {getHeaderTitle()}
      </h2>

      {/* Mobile Genre Filters (Shown whenever genre section is needed) */}
      <div className="flex flex-col w-full mb-6 md:hidden">
        <h2 className="font-bold text-lg">Filter by genre</h2>
        <h3 className="text-zinc-400 text-xs mb-3">
          Refine your search by genre
        </h3>
        <div className="flex flex-wrap gap-2">
          <MovieGenres toggleGenre={toggleGenre} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-2">
        {/* Desktop Sidebar Genre Filters */}
        <div className="hidden md:flex flex-col w-80 shrink-0">
          <h2 className="font-bold text-lg">Filter by genre</h2>
          <h3 className="text-zinc-400 text-xs mb-4">
            Refine your search by genre
          </h3>
          <div className="flex flex-wrap gap-2">
            <MovieGenres toggleGenre={toggleGenre} />
          </div>
        </div>

        <div
          className="hidden md:block h-auto w-px bg-gray-200 dark:bg-zinc-800"
          aria-hidden="true"
        />

        <div className="flex-1">
          {/* Desktop Subheader */}
          <h1 className="font-semibold text-xl mt-1 mb-6 hidden md:flex">
            {getHeaderTitle()}
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="flex flex-col md:w-57.5 w-[157.5px] h-77.25 md:h-109.75 bg-muted rounded-xl cursor-pointer"
                />
              ))}
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-201.5 md:gap-12">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex max-h-82.75 overflow-hidden rounded-md"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 border rounded-lg flex items-center justify-center text-zinc-500 font-medium">
              No results found
            </div>
          )}
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
    <div className="flex flex-col min-h-screen bg-white text-black dark:text-white dark:bg-black justify-center items-center">
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
