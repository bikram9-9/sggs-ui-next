"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { YoutubeEmbed } from "./youtube-embed";
import { fetchShabadYouTubeLinks } from "@/lib/api";
import type { YouTubeLink } from "@/lib/types/youtube-response.type";

interface ShabadsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  shabadNumber: string;
}

export function ShabadsSection({
  isOpen,
  onToggle,
  shabadNumber,
}: ShabadsSectionProps) {
  const [videos, setVideos] = useState<YouTubeLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      if (!shabadNumber || !isOpen) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchShabadYouTubeLinks(shabadNumber);
        setVideos(response.youtube_links);
      } catch (err) {
        setError("Failed to load videos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadVideos();
  }, [shabadNumber, isOpen]);

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
            {isLoading && <div>Loading videos...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {videos.map((video) => (
              <div key={video.url} className="space-y-2">
                <div className="aspect-video">
                  <YoutubeEmbed
                    videoId={video.url.split("v=")[1]}
                    title={video.title}
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium line-clamp-2">{video.title}</p>
                  <p className="text-muted-foreground">{video.channel}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
