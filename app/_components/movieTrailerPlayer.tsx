"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";

export default function MovieTrailerPlayer({
  movieId,
  onClose,
}: {
  movieId: number;
  onClose: () => void;
}) {
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };
  const [trailerKey, setTrailerKey] = useState<string>("null");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          { headers },
        );
        const officialTrailer = videoRes.data.results.find(
          (video: any) => video.site === "YouTube" && video.type === "Trailer",
        );
        setTrailerKey(
          officialTrailer
            ? officialTrailer.key
            : videoRes.data.results[0]?.key || null,
        );
      } catch (error) {
        console.error("failed to fetch movie data", error);
      } finally {
        setShowTrailer(true);
      }
    };
    fetchMovie();
  }, [movieId]);
  if (showTrailer) {
    return (
      <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-4xl aspect-video  rounded-xl overflow-hidden shadow-2xl">
          <button
            onClick={onClose}
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
    );
  }
}
