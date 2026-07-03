"use client";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MovieCarouselSkeleton() {
  return (
    <Carousel className="w-full relative flex h-[600xp pt-25 bg-white">
      <CarouselContent className="bg-white">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="flex justify-center  ">
            <Card className="flex justify-center p-0 rounded-none w-[1440px] h-[600px] bg-[#F4F4F5]">
              <CardContent className="flex items-center max-w-[1440px] relative justify-center p-0"></CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
