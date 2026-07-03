import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./moveCardSkeleton";

export default function UpcomingSkeleton() {
  return (
    <div className="flex flex-col max-w-[1440px] bg-white">
      <div className="flex flex-row justify-between pt-13 pb-8">
        <div className="bg-[#F4F4F5] w-5 rounded-md text-[#F4F4F5]" />
        <div className="bg-[#F4F4F5] w-5 rounded-md text-[#F4F4F5]" />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
