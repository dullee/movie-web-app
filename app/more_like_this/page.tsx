"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PageLayoutTemplate from "../_components/pageLayoutTemplate";

function MoreLikeThisContent() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const searchParam = useSearchParams();
  const movieId = Number(searchParam.get("id"))
  const currentPage = Number(searchParam.get("page")) || 1;

  const API_READ_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` },
          }
        );
        setMovies(res.data.results || []);
        const cappedPages =
          res.data.total_pages > 500 ? 500 : res.data.total_pages;
        setTotalPages(cappedPages || 1);
      } catch (error) {
        console.error("Failed fetching More like this movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [currentPage]);

  return (
    <PageLayoutTemplate
      pageTitle="More Like This"
      moviesArr={movies}
      loading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

export default function MoreLikeThis() {
  return (
    <Suspense fallback={null}>
      <MoreLikeThisContent />
    </Suspense>
  );
}