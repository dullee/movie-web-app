"use client";
import { useState } from "react";

const IMAGE_SERVICE_URL = "https://image.tmdb.org/t/p";

interface movieProps {
  title: string;
  image: string;
}

export default function Movie({ title, image }: movieProps) {
  return (
    <li className="list-none">
      <img src={`${IMAGE_SERVICE_URL}/w500${image}`} />
      <p>{title}</p>
    </li>
  );
}
