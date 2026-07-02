"use client";
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailsSkeleton() {
  return (
    <div className="flex p-20 pt-25 flex-col w-full max-w-6xl mx-auto justify-center items-center gap-8">
      <div className="flex justify-between w-full items-end border-b border-[#F4F4F5] pb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-[300px] bg-[#F4F4F5]" />
          <Skeleton className="h-4 w-[150px] bg-[#F4F4F5]" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-3 w-[50px] bg-[#F4F4F5]" />
          <Skeleton className="h-8 w-[60px] bg-[#F4F4F5]" />
        </div>
      </div>

      <div className="flex gap-10 w-full items-start">
        <Skeleton className="w-[280px] h-[428px] rounded-xl bg-[#F4F4F5] shrink-0" />

        <Skeleton className="flex-1 h-[428px] rounded-xl bg-[#F4F4F5]" />
      </div>

      <div className="w-full max-w-3xl mr-auto space-y-2">
        <Skeleton className="h-5 w-[100px] bg-[#F4F4F5]" />
        <Skeleton className="h-4 w-full bg-[#F4F4F5]" />
        <Skeleton className="h-4 w-full bg-[#F4F4F5]" />
        <Skeleton className="h-4 w-[80%] bg-[#F4F4F5]" />
      </div>
    </div>
  );
}
