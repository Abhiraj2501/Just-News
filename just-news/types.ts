
export interface Article {
  title: string;
  url: string;
  source?: string;
}

export interface NewsResponse {
  summary: string;
  articles: Article[];
  keywordFrequency: number;
}
