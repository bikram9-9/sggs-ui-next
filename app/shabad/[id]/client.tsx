"use client";

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { fetchShabad, type PageResponse, type Verse } from '@/lib/api';

export function ShabadClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [shabadData, setShabadData] = useState<PageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageNo = searchParams.get('page');
  const lineNo = searchParams.get('line');

  useEffect(() => {
    const loadShabad = async () => {
      if (!pageNo) return;

      try {
        setIsLoading(true);
        const data = await fetchShabad(parseInt(pageNo));
        setShabadData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load shabad');
      } finally {
        setIsLoading(false);
      }
    };

    loadShabad();
  }, [pageNo]);

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

  if (!shabadData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Shabad not found</div>
      </div>
    );
  }

  const highlightedLineNo = lineNo ? parseInt(lineNo) : undefined;

  return (
    <div className="min-h-[calc(100vh-61px)] bg-background flex flex-col p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-4 text-sm text-muted-foreground">
          Page: {shabadData.page} • Total Verses: {shabadData.count}
        </div>
        <div className="space-y-6">
          {shabadData.verses.map((verse: Verse) => (
            <div 
              key={verse._id}
              className={`p-4 rounded-lg transition-colors ${
                verse.lineNo === highlightedLineNo 
                  ? 'bg-accent/50' 
                  : 'hover:bg-accent/20'
              }`}
            >
              <div className="space-y-3">
                <p className="text-xl font-gurmukhi leading-relaxed">
                  {verse.verse.gurmukhi}
                </p>
                <p className="text-base text-muted-foreground">
                  {verse.translation.en.ssk || verse.translation.en.bdb || verse.translation.en.ms}
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