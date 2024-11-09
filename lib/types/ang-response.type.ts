export interface AngPageResponse {
  page: number;
  count: number;
  verses: AngVerse[];
}

export interface AngVerse {
  _id: string;
  pageNo: number;
  lineNo: number;
  verseId: number;
  verse: {
    gurmukhi: string;
    unicode: string;
  };
  translation: AngTranslation;
}

export interface AngTranslation {
  en: {
    bdb?: string;
    ms?: string;
    ssk?: string;
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
    ss?: string;
    sts?: string;
  };
}
