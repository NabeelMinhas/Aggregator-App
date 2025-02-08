export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  author?: string;
  publishedAt: string;
}

export type NewsSource = 'guardian' | 'newsapi' | 'nytimes';
export type Category = 'general' | 'business' | 'technology' | 'sports' | 'entertainment' | 'health' | 'science';

export interface NewsFilters {
  search: string;
  sources: NewsSource[];
  categories: Category[];
  authors: string[];
  startDate?: string;
  endDate?: string;
  page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}