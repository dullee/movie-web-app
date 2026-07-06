import { Button } from "@/components/ui/button";

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
  toggleGenre: (genreName: string) => void;
}) {
  return AVAILABLE_GENRES.map((genre) => (
    <Button
      key={genre}
      variant="outline"
      className="rounded-full"
      onClick={() => toggleGenre(genre)}
    >
      {genre === "Science Fiction" ? "Sci-Fi" : genre}
    </Button>
  ));
}
