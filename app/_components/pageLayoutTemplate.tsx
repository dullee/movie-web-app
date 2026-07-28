// components/pageLayoutTemplate.tsx
"use client";

import Header from "./header";
import Footer from "./footer";
import MovieCard from "./movieCard";
import MoviePagination from "./pagination";
import PageMoviesSkeleton from "./pageMoviesSkeleton";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

interface PageLayoutTemplateProps {
  pageTitle: string;
  moviesArr: Movie[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
}

export default function PageLayoutTemplate({
  pageTitle,
  moviesArr,
  loading,
  currentPage,
  totalPages,
}: PageLayoutTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />

      <main className="flex-1 w-full max-w-360 mx-auto md:p-20 pt-22.5 px-5 md:pt-32">
        {loading ? (
          <PageMoviesSkeleton />
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-8">{pageTitle}</h1>
            <div className="grid md:grid-cols-5 grid-cols-2 gap-5 md:gap-8">
              {moviesArr.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex md:justify-center items-center gap-4 md:mt-12 md:pb-6">
            <MoviePagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}