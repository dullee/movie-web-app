"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

export default function MovieDetailsSkeleton() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Real Active Header */}
      <Header />

      {/* Main Skeleton Area (Between Header & Footer) */}
      <div className="flex md:p-20 pt-22.5 md:pt-25 flex-col w-full max-w-6xl mx-auto justify-center items-center md:gap-8 flex-1">
        {/* Title & Rating Row */}
        <div className="flex justify-between w-full items-end md:px-0 px-5 pb-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 md:h-10 w-48 md:w-80" />

            <Skeleton className="h-4 w-36 md:w-48" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-3 w-12 hidden md:block" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="h-7 w-14" />
            </div>
          </div>
        </div>
        <Skeleton className="h-55.25 w-full rounded-none md:hidden" />
        {/* Big Hero Backdrop & Poster Section */}
        <div className="flex md:flex-row flex-col-reverse gap-10 w-full items-start">
          {/* Poster Column */}
          <div className="flex flex-row px-5 md:px-0 gap-8.5 w-full md:w-auto">
            <Skeleton className="md:w-72.5 md:h-107 w-25 h-37 rounded-none md:rounded-xl shrink-0" />
            {/* Mobile Overview Summary Skeleton */}
            <div className="flex flex-col md:hidden gap-5 w-full">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
          {/* Big Hero Backdrop Image (h-107) */}
          <Skeleton className="w-full flex-1 md:rounded-xl rounded-none h-107 shrink-0" />
        </div>
        {/* Desktop Details (Genres, Overview, Credits) */}
        <div className="w-full">
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>

            <div className="space-y-2 max-w-3xl">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Director / Writers / Stars Rows */}
          <div className="space-y-3 px-5 md:px-0 pt-6 w-full">
            <div className="flex items-center border-b border-border pb-2 gap-2">
              <Skeleton className="h-4 w-20 shrink-0" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center border-b border-border pb-2 gap-2">
              <Skeleton className="h-4 w-20 shrink-0" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center border-b border-border pb-2 gap-2">
              <Skeleton className="h-4 w-20 shrink-0" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
        {/* Similar Movies Placeholder */}
        <div className="w-full md:px-0 px-5 pt-8 space-y-4">
          <Skeleton className="h-7 w-40" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Skeleton className="h-60 w-full rounded-lg" />
            <Skeleton className="h-60 w-full rounded-lg" />
            <Skeleton className="h-60 w-full rounded-lg hidden md:block" />
            <Skeleton className="h-60 w-full rounded-lg hidden md:block" />
            <Skeleton className="h-60 w-full rounded-lg hidden md:block" />
          </div>
        </div>
      </div>

      {/* Real Active Footer */}
      <Footer />
    </div>
  );
}
