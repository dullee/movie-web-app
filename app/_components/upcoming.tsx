import MovieCard from "./movieCard";
import UpcomingSkeleton from "./upcomingSkeleton";

export default function Upcoming({
  movies,
  loading,
}: {
  movies: any[];
  loading: boolean;
}) {
  if (loading) {
    <UpcomingSkeleton />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px] p-20 bg-white">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <h1>Upcoming</h1>
        <button>See more</button>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 gap-8">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} loading={loading} />
        ))}
      </div>
    </div>
  );
}
