import type { AutocompleteSearchResponse } from "./types/autocomplete-response.type";
import type { AngPageResponse } from "./types/ang-response.type";
import type { YouTubeResponse } from "./types/youtube-response.type";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL environment variable is not defined"
  );
}
import type { YoutubeBody } from "./types/youtube-response.type";

export async function searchGurbani(
  query: string
): Promise<AutocompleteSearchResponse[]> {
  try {
    if (!query.trim()) return [];

    const params = new URLSearchParams({
      query: query,
      limit: "20",
    });

    const response = await fetch(`${BASE_URL}/autocomplete/first/?${params}`);
    if (!response.ok) throw new Error("Failed to fetch results");

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export async function fetchPage(pageNo: number): Promise<AngPageResponse> {
  try {
    const response = await fetch(`${BASE_URL}/page/${pageNo}`);
    if (!response.ok) throw new Error("Failed to fetch shabad details");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Ang error:", error);
    throw error;
  }
}

export async function fetchShabadYouTubeLinks(
  shabadNumber: string
): Promise<YouTubeResponse> {
  try {
    const response = await fetch(`${BASE_URL}/shabad/youtube`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shabad_number: shabadNumber.toString(),
      } as YoutubeBody),
    });

    if (!response.ok) throw new Error("Failed to fetch YouTube links");
    return (await response.json()) as YouTubeResponse;
  } catch (error) {
    console.error("Fetch YouTube links error:", error);
    throw error;
  }
}
