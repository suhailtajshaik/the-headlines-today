export interface Article {
  section: string;
  sectionEmoji: string;
  headline: string;
  lede: string;
  body: string;
  kicker: string;
  readTime: string;
}

export interface NewsEdition {
  date: string;
  label: string;
  articles: Article[];
  generatedAt: string;
  editor: string;
}

export interface IndexEntry {
  date: string;
  label: string;
  pdf?: string;
  audio?: string;
}

export interface IndexData {
  editions: IndexEntry[];
}
