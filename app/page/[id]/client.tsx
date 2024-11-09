"use client";

import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/api";
import { AngPageResponse, AngVerse } from "@/lib/types/ang-response.type";
import { SearchBox } from "@/components/search-box";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export function PageClient({ id }: { id: string }) {
  const [pageData, setPageData] = useState<AngPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const currentPage = parseInt(id);
  const totalPages = 1430; // Total number of pages in Sri Guru Granth Sahib Ji

  useEffect(() => {
    const loadPage = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await fetchPage(parseInt(id));
        setPageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [id]);

  const handleResultSelect = (result: any) => {
    router.push(`/page/${result.pageNo}`);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/page/${i}`} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Ang not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-61px)] bg-background flex flex-col p-4">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {/* Search Box */}
        <div className="sticky top-0 z-10 bg-background pt-2 pb-4 border-b">
          <SearchBox
            searchType="firstLetterStart"
            onResultSelect={handleResultSelect}
          />
        </div>

        {/* Page Info and Pagination */}
        <div className="flex flex-col gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/page/${currentPage - 1}`}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {renderPagination()}
              <PaginationItem>
                <PaginationNext
                  href={`/page/${currentPage + 1}`}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ਅੰਗ {pageData.page}</h1>
            <div className="text-sm text-muted-foreground">
              Total Verses: {pageData.count}
            </div>
          </div>
        </div>

        {/* Verses */}
        <div className="space-y-4 bg-accent/5 rounded-lg p-6">
          {pageData.verses.map((verse: AngVerse) => (
            <div
              key={verse._id}
              className="p-3 rounded-lg transition-colors hover:bg-accent/20"
            >
              <div className="space-y-2">
                <p className="text-xl font-gurmukhi leading-relaxed">
                  {verse.verse.unicode}
                </p>
                <p className="text-base text-muted-foreground">
                  {verse.translation.en.ssk ||
                    verse.translation.en.bdb ||
                    verse.translation.en.ms}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
