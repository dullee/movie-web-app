"use client";

import MovieCardSkeleton from "../_components/moveCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageMoviesSkeleton() {
  return (
    <div>
      <div className="mb-8 dark:bg-black">
        <Skeleton className="dark:bg-black w-37 h-10"></Skeleton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 dark:bg-black md:gap-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
