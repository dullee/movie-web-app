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
    <Card className="flex flex-col bg-[#F4F4F5] w-[230px] h-[439px]  rounded-xl cursor-pointer overflow-hidden">
      <Skeleton />
    </Card>
  );
}
