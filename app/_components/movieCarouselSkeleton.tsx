"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCarouselSkeleton() {
  return (
    <div className="w-full relative flex h-[600px] md:pt-25 pt-3   dark:bg-black">
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center max-w-360 w-full relative justify-center p-0 bg-background dark:bg-black">
          {/* Backdrop Image Skeleton */}
          <Skeleton className="w-full md:h-150 h-61.5 rounded-none" />

          {/* Info Content Skeleton */}
          <div className="w-full md:absolute flex flex-col md:top-1/3 left-1/8 xl:max-w-1/4 p-5 md:max-w-1/2">
            {/* Title & Rating Row */}
            <div className="flex flex-row justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* "Now Playing:" label */}
                <Skeleton className="h-8 md:h-10 w-48 md:w-64" />{" "}
                {/* Movie Title */}
              </div>

              {/* Rating Skeleton */}
              <div className="flex flex-row items-center gap-2 pt-1">
                <Skeleton className="w-7 h-7 rounded-full" /> {/* Star Icon */}
                <Skeleton className="h-6 w-12" /> {/* Score text */}
              </div>
            </div>

            {/* Overview Paragraph Skeleton */}
            <div className="space-y-2 py-4 md:max-w-4/5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>

            {/* Watch Trailer Button Skeleton */}
            <Skeleton className="h-11 w-36.25 md:w-36 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
