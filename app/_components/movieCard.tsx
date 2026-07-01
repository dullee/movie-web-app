"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MovieDetails from "./movieDetails";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

interface movieProps {
  id: number;
  title: string;
  image: string;
  rating: number;
}

export default function MovieCard({ id, title, image, rating }: movieProps) {
  return (
    <Link href={`/movie/${id}`}>
      <Card className="flex flex-col bg-[#F4F4F5] rounded-xl cursor-pointer overflow-hidden">
        <img
          className="w-full object-cover"
          src={`${IMAGE_SERVICE_URL}/w500${image}`}
        />
        <CardContent className="p-2">
          <div className="flex">
            <p>{Math.round(rating * 10) / 10}</p>
            <span>/10</span>
          </div>

          <CardTitle className="overflow-hidden">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
