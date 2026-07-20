import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const AVAILABLE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
];

export default function MovieGenres({
  toggleGenre,
}: {
  toggleGenre: (genre: { id: number; name: string }) => void;
}) {
  const BASE_API: string = "https://api.themoviedb.org/3";
  const API_READ_ACCESS_TOKEN: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWE3OGQ2OTcwZWQwMjVhM2M4OTJhYWMzMmU5MDIyMyIsIm5iZiI6MTc4MjM1NjE0OC45OTMsInN1YiI6IjZhM2M5OGI0ZmIwMGJlY2M0NDNlNWJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MIxDzsEjJDNt6C-EpUX1pBSMbTbxjFyggM_M_q4pC04";
  const headers = { Authorization: `Bearer ${API_READ_ACCESS_TOKEN}` };

  const [genreIds, setGenreIds] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreIdRes = await axios.get(
          `${BASE_API}/genre/movie/list?language=en`,
          { headers },
        );

        setGenreIds(genreIdRes.data.genres);
      } catch (error) {
        console.error("Failed fetching upcoming view:", error);
      } finally {
      }
    };
    fetchMovies();
  }, []);

  const sendGenre = (genreName: string) => {
    const genre = genreIds.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase(),
    );
    if (!genre) return;
    toggleGenre(genre);
  };

  return AVAILABLE_GENRES.map((genre) => (
    <Button
      key={genre}
      variant="outline"
      className=" rounded-full w-fit pr-px px-0.5 text-xs h-4"
      onClick={() => sendGenre(genre)}
    >
      <p className="flex pl-2.5 font-semibold">
        {genre === "Science Fiction" ? "Sci-Fi" : genre}
      </p>
      <ChevronRight strokeWidth={1.5}/>
    </Button>
  ));
}
