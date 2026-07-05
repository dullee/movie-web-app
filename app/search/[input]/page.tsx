"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import MovieCard from "@/app/_components/movieCard";
import { Button } from "@/components/ui/button";

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
      setLoading(true);
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

    setSelectedGenreIds(
      (prev) =>
        prev.includes(genre.id)
          ? prev.filter((id) => id !== genre.id) // Remove if already selected
          : [...prev, genre.id], // Add if not selected
    );
  };
  // This runs automatically every time 'movies' or 'selectedGenreIds' changes
  const displayedMovies =
    selectedGenreIds.length === 0
      ? movies // If no genres are selected, show everything
      : movies.filter((movie) =>
          // Change to .every() if you want movies that match ALL selected genres
          selectedGenreIds.some((id) => movie.genre_ids?.includes(id)),
        );

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <h1 className="pt-50">Search Results</h1>
      <h2>
        {displayedMovies?.length} results for "{searchInput}" {selectedGenreIds}
      </h2>
      <div className="flex flex-row">
        {loading ? (
          // Displaying a simple loading state array loop while waiting on API
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-zinc-200 h-[340px] rounded-xl"
              />
            ))}
          </div>
        ) : (
          // Clean grid mapping block without extraneous inner brackets
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} widthClass="w-[165px]" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 h-20">
           <h2>Search by genre</h2>
          <Button onClick={() => toggleGenre("Action")}>Action</Button>
          <Button onClick={() => toggleGenre("Adventure")}>Adventure</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Animation</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Biography</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Comedy</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Crime</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Documentary</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Drama</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Family</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Fantasy</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Film-Noir</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Game-Show</Button>
          <Button onClick={() => toggleGenre("Comedy")}>History</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Horro</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Music</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Musical</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Mystery</Button>
          <Button onClick={() => toggleGenre("Comedy")}>News</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Reality-TV</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Romance</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Sci-Fi</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Short</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Sport</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Talk-Show</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Thriller</Button>
          <Button onClick={() => toggleGenre("Comedy")}>War</Button>
          <Button onClick={() => toggleGenre("Comedy")}>Western</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
