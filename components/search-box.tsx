"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { searchGurbani, type SearchResult } from "@/lib/api";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
  onResultSelect: (result: SearchResult) => void;
}

export function SearchBox({ onResultSelect }: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchGurbani(debouncedQuery);
        setResults(searchResults);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/shabad/${result.shabadId}?page=${result.pageNo}&line=${result.lineNo}`);
    onResultSelect(result);
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter first letters..."
          className="h-12 text-lg pr-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 bg-background border-input"
        />
        <Button 
          className="absolute right-0 top-0 h-12 px-6 rounded-r-xl"
          variant="ghost"
          disabled={isLoading}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 rounded-xl border bg-card shadow-lg z-50">
          <Command className="rounded-xl">
            <CommandList>
              {isLoading ? (
                <CommandEmpty>Searching...</CommandEmpty>
              ) : results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((result) => (
                    <CommandItem
                      key={`${result.pageNo}-${result.lineNo}`}
                      onSelect={() => handleSelect(result)}
                      className="flex flex-col items-start py-3 px-4 cursor-pointer"
                    >
                      <span className="text-lg font-gurmukhi">{result.gurmukhi}</span>
                      <span className="text-sm text-muted-foreground">{result.english}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Page: {result.pageNo}, Line: {result.lineNo}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}