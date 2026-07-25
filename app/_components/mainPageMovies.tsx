import MovieCard from "./movieCard";
import Skeleton from "./mainPageMoviesSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MainPageMovies({
  title,
  movies,
  loading,
}: {
  title: string;
  movies: any[];
  loading: boolean;
}) {
  if (loading || !movies || movies.length === 0) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col w-full max-w-360 xl:px-20 px-5 bg-background dark:bg-black">
      <div className="flex flex-row justify-between items-center pt-13 pb-8">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <div className="px-4 py-2">
          <Link
            href="/upcoming"
            className="cursor-pointer hover:underline flex flex-row items-center gap-2"
          >
            <span>See more</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-2 md:gap-8 gap-5">
        {movies?.slice(0, 10).map((movie) => (
          <div key={movie.id} className="md:w-57.5 w-[157.5px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
