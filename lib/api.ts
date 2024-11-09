const BASE_URL = 'https://sggs-api-git-main-bikram9-9s-projects.vercel.app';

export interface SearchResult {
  gurmukhi: string;
  english: string;
  lineNo: number;
  pageNo: number;
  shabadId: number;
}

export interface Translation {
  en: {
    bdb: string;
    ms: string;
    ssk: string;
  };
  pu?: {
    ss?: {
      gurmukhi: string;
      unicode: string;
    };
    ft?: {
      gurmukhi: string;
      unicode: string;
    };
    bdb?: {
      gurmukhi: string;
      unicode: string;
    };
    ms?: {
      gurmukhi: string;
      unicode: string;
    };
  };
  es?: {
    sn: string;
  };
  hi?: {
    ss: string;
    sts: string;
  };
}

export interface Verse {
  _id: string;
  pageNo: number;
  lineNo: number;
  verseId: number;
  verse: {
    gurmukhi: string;
    unicode: string;
  };
  translation: Translation;
}

export interface PageResponse {
  page: number;
  count: number;
  verses: Verse[];
}

export async function searchGurbani(query: string): Promise<SearchResult[]> {
  try {
    if (!query.trim()) return [];

    const params = new URLSearchParams({
      query: query,
      limit: '20'
    });

    const response = await fetch(`${BASE_URL}/autocomplete/first/?${params}`);
    if (!response.ok) throw new Error('Failed to fetch results');

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function fetchShabad(pageNo: number): Promise<PageResponse> {
  try {
    const response = await fetch(`${BASE_URL}/page/${pageNo}`);
    if (!response.ok) throw new Error('Failed to fetch shabad details');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch shabad error:', error);
    throw error;
  }
}