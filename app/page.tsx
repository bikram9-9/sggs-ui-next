"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { SearchResults } from "@/components/search-results";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/lib/api";

export default function Home() {
  const [selectedResult, setSelectedResult] = useState<SearchResult | undefined>();
  const [searchType, setSearchType] = useState("firstLetterStart");
  const router = useRouter();

  const searchTypes = [
    { id: "firstLetterStart", label: "First Letter (Start)" },
    { id: "firstLetterAnywhere", label: "First Letter (Anywhere)" },
    { id: "gurmukhi", label: "ਗੁਰਮੁਖੀ" },
    { id: "english", label: "English" },
  ];

  const handleReset = () => {
    setSelectedResult(undefined);
    router.push('/');
  };

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
    router.push(`/shabad/${result.shabadId}?page=${result.pageNo}&line=${result.lineNo}`);
  };

  return (
    <div className="min-h-[calc(100vh-61px)] bg-background flex flex-col p-4">
      <div className={`w-full max-w-3xl mx-auto space-y-8 transition-all duration-500 ease-in-out transform ${
        selectedResult ? 'translate-y-0' : 'translate-y-[30vh]'
      }`}>
        {!selectedResult && (
          <div className="flex items-center justify-center gap-4 transition-opacity duration-500">
            <h1 
              onClick={handleReset}
              className="text-5xl md:text-7xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              ਗੁਰਬਾਣੀ
            </h1>
            <p className="text-lg text-muted-foreground font-['Brush Script MT',_cursive]">Space</p>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-12 px-4 font-normal justify-between min-w-[180px]"
                >
                  {searchTypes.find(type => type.id === searchType)?.label}
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {searchTypes.map((type) => (
                  <DropdownMenuItem
                    key={type.id}
                    onClick={() => setSearchType(type.id)}
                    className="flex items-center"
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex-1">
              <SearchBox onResultSelect={handleResultSelect} searchType={searchType} />
            </div>
          </div>

          {searchType.startsWith("firstLetter") && (
            <p className="text-sm text-center text-muted-foreground">
              Example: ਕ ਨ ਸ would search for ਕਰਿ ਨਾਮੁ ਸੰਤੋਖੁ
            </p>
          )}
        </div>

        {selectedResult && <SearchResults result={selectedResult} />}
      </div>
    </div>
  );
}