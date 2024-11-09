"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import type { AutocompleteSearchResponse } from "@/lib/types/autocomplete-response.type";

interface SearchResultsProps {
  result?: AutocompleteSearchResponse;
}

export function SearchResults({ result }: SearchResultsProps) {
  const [showGurmukhi, setShowGurmukhi] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [textSize, setTextSize] = useState<"base" | "lg" | "xl" | "2xl">("xl");

  if (!result) return null;

  const textSizeOptions = [
    { label: "Normal", value: "base" },
    { label: "Large", value: "lg" },
    { label: "X-Large", value: "xl" },
    { label: "2X-Large", value: "2xl" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 mb-8">
      <div className="flex items-center justify-between py-2">
        <div className="text-sm text-muted-foreground">
          Line {result.lineNo}
        </div>
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
            <DropdownMenuItem
              onClick={() => setShowGurmukhi(!showGurmukhi)}
              className="flex items-center justify-between"
            >
              <span>ਪੰਜਾਬੀ</span>
              {showGurmukhi && <span className="text-xs">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowEnglish(!showEnglish)}
              className="flex items-center justify-between"
            >
              <span>English</span>
              {showEnglish && <span className="text-xs">✓</span>}
            </DropdownMenuItem>
            {textSizeOptions.map((size) => (
              <DropdownMenuItem
                key={size.value}
                onClick={() => setTextSize(size.value as typeof textSize)}
                className="flex items-center justify-between"
              >
                <span>{size.label}</span>
                {textSize === size.value && <span className="text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
        {showGurmukhi && (
          <p className={`text-${textSize} leading-relaxed font-gurmukhi`}>
            {result.gurmukhi}
          </p>
        )}
        {showEnglish && (
          <p
            className={`text-${textSize} leading-relaxed text-muted-foreground`}
          >
            {result.english}
          </p>
        )}
      </div>
    </div>
  );
}
