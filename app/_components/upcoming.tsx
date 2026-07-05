import MovieCard from "./movieCard";
import UpcomingSkeleton from "./upcomingSkeleton";
import Link from "next/link";

export default function Upcoming({
  movies,
  loading,
}: {
  movies: any[];
  loading: boolean;
}) {
  if (loading || !movies || movies.length === 0) {
    return <UpcomingSkeleton />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px] px-20 bg-white">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <h1>Upcoming</h1>
        <Link href="/upcoming">See more</Link>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 gap-8">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
