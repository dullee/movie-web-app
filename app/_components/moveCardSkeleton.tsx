"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <Skeleton className="flex flex-col md:w-57.5 w-[157.5px] h-77.25 md:h-109.75 bg-muted dark:bg-black rounded-xl cursor-pointer overflow-hidden "></Skeleton>
  );
}
