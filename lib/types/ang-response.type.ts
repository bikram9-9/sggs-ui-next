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
  shabadId: string;
  verse: {
    gurmukhi: string;
    unicode: string;
  };
  translation: AngTranslation;
  transliteration?: {
    english?: string;
    hindi?: string;
    en?: string;
    hi?: string;
    ipa?: string;
    ur?: string;
  };
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
  transliteration?: {
    english?: string;
    hindi?: string;
    en?: string;
    hi?: string;
    ipa?: string;
    ur?: string;
  };
}
