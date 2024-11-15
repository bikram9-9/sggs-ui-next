"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { SearchResults } from "@/components/search-results";
import { ChevronDown, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import type { AutocompleteSearchResponse } from "@/lib/types/autocomplete-response.type";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [selectedResult, setSelectedResult] = useState<
    AutocompleteSearchResponse | undefined
  >();
  const [searchType, setSearchType] = useState("firstLetterStart");
  const [showWhatsAppBanner, setShowWhatsAppBanner] = useState(true);
  const router = useRouter();

  const searchTypes = [
    { id: "firstLetterStart", label: "First Letter (Start)" },
    { id: "firstLetterAnywhere", label: "First Letter (Anywhere)" },
    { id: "gurmukhi", label: "ਗੁਰਮੁਖੀ" },
    { id: "english", label: "English" },
  ];

  const handleReset = () => {
    setSelectedResult(undefined);
    router.push("/");
  };

  const handleResultSelect = (result: AutocompleteSearchResponse) => {
    setSelectedResult(result);
    router.push(`/page/${result.pageNo}`);
  };

  const handleWhatsAppSubscribe = () => {
    const whatsappUrl =
      "https://wa.me/1234567890?text=Subscribe%20to%20Daily%20Hukumnama";
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-[calc(100vh-61px)] bg-background flex flex-col p-4">
      <div className="w-full max-w-3xl mx-auto mb-4">
        {/* Add state to track visibility */}
        {showWhatsAppBanner && (
          <div className="relative">
            <button
              onClick={handleWhatsAppSubscribe}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaWhatsapp className="text-2xl" />
              Subscribe to Daily Hukumnama on WhatsApp
            </button>
            <button
              onClick={() => setShowWhatsAppBanner(false)}
              className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              aria-label="Close banner"
            >
              <span className="text-white font-medium">×</span>
            </button>
          </div>
        )}
      </div>

      <div
        className={`w-full max-w-3xl mx-auto space-y-8 transition-all duration-500 ease-in-out transform ${
          selectedResult ? "translate-y-0" : "translate-y-[30vh]"
        }`}
      >
        {!selectedResult && (
          <div className="flex flex-col items-center justify-center gap-4 transition-opacity duration-500">
            <div className="flex items-center gap-4">
              <h1
                onClick={handleReset}
                className="text-5xl md:text-7xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
              >
                ਗੁਰਬਾਣੀ
              </h1>
              <p className="text-lg text-muted-foreground font-['Brush Script MT',_cursive]">
                Space
              </p>
            </div>
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
                  {searchTypes.find((type) => type.id === searchType)?.label}
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
              <SearchBox
                onResultSelect={handleResultSelect}
                searchType={searchType}
              />
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
