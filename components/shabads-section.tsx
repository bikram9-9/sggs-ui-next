"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { YoutubeEmbed } from "./youtube-embed";

interface ShabadsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ShabadsSection({ isOpen, onToggle }: ShabadsSectionProps) {
  // Hardcoded video IDs for now - these would come from your API
  const videoIds = ["dQw4w9WgXcQ", "9bZkp7q19f0", "JGwWNGJdvx8"];

  return (
    <div
      className={`fixed top-[61px] right-0 h-[calc(100vh-61px)] bg-background border-l transition-all duration-300 ${
        isOpen ? "w-[350px]" : "w-0"
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute -left-8 top-4 h-8 w-8 p-0 rounded-full"
        onClick={onToggle}
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          <h2 className="text-lg font-semibold">Related Shabads</h2>
          <div className="space-y-4">
            {videoIds.map((videoId) => (
              <div key={videoId} className="aspect-video">
                <YoutubeEmbed videoId={videoId} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
