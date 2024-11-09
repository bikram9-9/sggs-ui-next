"use client";

import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/api";
import { AngPageResponse, AngVerse } from "@/lib/types/ang-response.type";

export function PageClient({ id }: { id: string }) {
  const [pageData, setPageData] = useState<AngPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-4 text-sm text-muted-foreground">
          Page: {pageData.page} • Total Verses: {pageData.count}
        </div>
        <div className="space-y-6">
          {pageData.verses.map((verse: AngVerse) => (
            <div
              key={verse._id}
              className={`p-4 rounded-lg transition-colors hover:bg-accent/20`}
            >
              <div className="space-y-3">
                <p className="text-xl font-gurmukhi leading-relaxed">
                  {verse.verse.unicode}
                </p>
                <p className="text-base text-muted-foreground">
                  {verse.translation.en.ssk ||
                    verse.translation.en.bdb ||
                    verse.translation.en.ms}
                </p>
                <div className="text-xs text-muted-foreground">
                  Line {verse.lineNo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
