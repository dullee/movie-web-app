"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../_components/header";
import Footer from "../_components/footer";
import MovieCard from "../_components/movieCard";
import { Button } from "@/components/ui/button";
import MovieCardSkeleton from "../_components/moveCardSkeleton";

export default function UpcomingPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
          { headers },
        );
        setMovies(res.data.results || []);
        setTotalPages(res.data.total_pages || 1);
      } catch (error) {
        console.error("Failed fetching upcoming view:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingMovies();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 w-full max-w-360 mx-auto p-20 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upcoming</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-12 pb-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-black"
          >
            Previous
          </Button>{" "}
          <Button>{page}</Button>{" "}
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="text-black"
          >
            {page + 1}
          </Button>{" "}
          <span className="text-sm text-black">...</span>
          <Button
            variant="outline"
            disabled={page > totalPages - 4}
            onClick={() => setPage((p) => p + 4)}
            className="text-black"
          >
            {page + 4}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
