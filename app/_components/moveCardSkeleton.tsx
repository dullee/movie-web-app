"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MovieCardSkeleton() {
  return (
    <Card className="flex flex-col bg-[#F4F4F5] w-[272px] h-[498px] rounded-xl cursor-pointer overflow-hidden">
      <CardContent className="p-2"></CardContent>
    </Card>
  );
}
