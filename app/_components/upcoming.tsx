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
    <div className="flex flex-col w-full max-w-360 px-20 bg-background dark:bg-black">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <h1>Upcoming</h1>
        <Link href="/upcoming" className="cursor-pointer hover:underline">
          See more
        </Link>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 gap-8">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
