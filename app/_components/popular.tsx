import MovieCard from "./movieCard";
import UpcomingSkeleton from "./upcomingSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Popular({
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
    <div className="flex flex-col w-full max-w-360 px-20 bg-white dark:bg-black">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <h1 className="font-semibold text-2xl">Popular</h1>
        <div className="px-4 py-2">
          <Link
            href="/popular"
            className="cursor-pointer hover:underline flex flex-row items-center gap-2"
          >
            <span>See more</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 gap-8">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
