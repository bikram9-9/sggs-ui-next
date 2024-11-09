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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { ShabadsSection } from "@/components/shabads-section";

export function PageClient({ id }: { id: string }) {
  const [pageData, setPageData] = useState<AngPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const currentPage = parseInt(id);
  const totalPages = 1430; // Total number of pages in Sri Guru Granth Sahib Ji
  const [showGurmukhi, setShowGurmukhi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showPunjabi, setShowPunjabi] = useState(false);
  const [showSpanish, setShowSpanish] = useState(false);
  const [showHindi, setShowHindi] = useState(true);
  const [showEnglishTranslit, setShowEnglishTranslit] = useState(true);
  const [showHindiTranslit, setShowHindiTranslit] = useState(false);
  const [showIpaTranslit, setShowIpaTranslit] = useState(false);
  const [showUrduTranslit, setShowUrduTranslit] = useState(false);
  const [showShabads, setShowShabads] = useState(true);

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
    <div className="min-h-[calc(100vh-61px)] bg-background flex">
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          showShabads ? "mr-[350px]" : ""
        }`}
      >
        <div className="w-full max-w-3xl mx-auto space-y-6">
          {/* Search Box */}
          <div className="sticky top-0 z-10 bg-background pt-2 pb-4 border-b">
            <SearchBox
              searchType="firstLetterStart"
              onResultSelect={handleResultSelect}
            />
          </div>

          {/* Page Info, Filter and Pagination */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">ਅੰਗ {pageData.page}</h1>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-normal"
                    >
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      Display Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Translations</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowGurmukhi(!showGurmukhi);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>ਗੁਰਮੁਖੀ</span>
                      {showGurmukhi && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowEnglish(!showEnglish);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>English</span>
                      {showEnglish && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPunjabi(!showPunjabi);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>ਪੰਜਾਬੀ</span>
                      {showPunjabi && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSpanish(!showSpanish);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>Español</span>
                      {showSpanish && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowHindi(!showHindi);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>हिंदी</span>
                      {showHindi && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>

                    <DropdownMenuLabel className="mt-2">
                      Transliterations
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowEnglishTranslit(!showEnglishTranslit);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>English</span>
                      {showEnglishTranslit && (
                        <span className="text-xs">✓</span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowHindiTranslit(!showHindiTranslit);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>Hindi</span>
                      {showHindiTranslit && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowIpaTranslit(!showIpaTranslit);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>IPA</span>
                      {showIpaTranslit && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setShowUrduTranslit(!showUrduTranslit);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>Urdu</span>
                      {showUrduTranslit && <span className="text-xs">✓</span>}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Verses with conditional rendering */}
            <div className="space-y-4 bg-accent/5 rounded-lg p-6">
              {pageData.verses.map((verse: AngVerse, index: number) => (
                <div
                  key={verse._id}
                  className={`p-3 rounded-lg transition-colors hover:bg-accent/20 ${
                    index % 2 === 1 ? "bg-accent/50" : ""
                  }`}
                >
                  <div className="space-y-2">
                    {showGurmukhi && (
                      <p className="text-3xl font-gurmukhi leading-relaxed">
                        {verse.verse.unicode}
                      </p>
                    )}
                    {showEnglish && (
                      <p className="text-base text-muted-foreground">
                        {verse.translation.en.ssk ||
                          verse.translation.en.bdb ||
                          verse.translation.en.ms}
                      </p>
                    )}
                    {showPunjabi && verse.translation.pu?.ss && (
                      <p className="text-base text-muted-foreground font-gurmukhi">
                        {verse.translation.pu.ss.unicode}
                      </p>
                    )}
                    {showSpanish && verse.translation.es?.sn && (
                      <p className="text-base text-muted-foreground">
                        {verse.translation.es.sn}
                      </p>
                    )}
                    {showHindi && verse.translation.hi?.ss && (
                      <p className="text-base text-muted-foreground">
                        {verse.translation.hi.ss}
                      </p>
                    )}

                    {showEnglishTranslit && verse.transliteration?.en && (
                      <p className="text-base text-muted-foreground">
                        {verse.transliteration.en}
                      </p>
                    )}
                    {showHindiTranslit && verse.transliteration?.hi && (
                      <p className="text-base text-muted-foreground">
                        {verse.transliteration.hi}
                      </p>
                    )}
                    {showIpaTranslit && verse.transliteration?.ipa && (
                      <p className="text-base text-muted-foreground font-mono">
                        {verse.transliteration.ipa}
                      </p>
                    )}
                    {showUrduTranslit && verse.transliteration?.ur && (
                      <p className="text-base text-muted-foreground">
                        {verse.transliteration.ur}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ShabadsSection
        isOpen={showShabads}
        onToggle={() => setShowShabads(!showShabads)}
        shabadNumber={pageData.verses[0].shabadId}
      />
    </div>
  );
}
