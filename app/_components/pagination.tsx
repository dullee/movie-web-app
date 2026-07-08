"use client";

import { useSearchParams, usePathname } from "next/navigation"; // 🚀 Added usePathname
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function MoviePagination({
  currentPage,
  totalPages,
}: MoviePaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // 🚀 Dynamically returns "/upcoming", "/top-rated", "/search", etc.

  // 🧮 Helper to build URL strings on the fly for whatever route we are currently on
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    // 🚀 Uses 'pathname' instead of hardcoding '/search'
    return `${pathname}?${params.toString()}`;
  };

  // If there's only 1 page or no results, hide the pagination block cleanly
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-12 select-none">
      <PaginationContent>
        {/* Previous Navigation Control */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* Page 1 Cap Anchor */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Dynamic Inner Toggles (Left Page) */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Active Current Viewport Page Item */}
        <PaginationItem>
          <PaginationLink href={createPageUrl(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Dynamic Inner Toggles (Right Page) */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Final Page Boundary Capper */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={createPageUrl(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Navigation Control */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
            }
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
