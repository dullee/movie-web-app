"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <Skeleton className="flex flex-col w-[230px] h-[439px] bg-[#F4F4F5] rounded-xl cursor-pointer overflow-hidden "></Skeleton>
  );
}
