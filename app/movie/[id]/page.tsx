"use client";

import { useParams } from "next/navigation";
import MovieDetails from "@/app/_components/movieDetails";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params?.id);

  return <MovieDetails movieId={id} />;
}
