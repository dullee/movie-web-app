"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCarouselSkeleton() {
  return (
    <div className="w-full relative flex h-[600xp pt-25 justify-center bg-white">
      <Skeleton className="flex justify-center p-0 rounded-none w-360 h-150 bg-[#F4F4F5]"></Skeleton>
    </div>
  );
}
