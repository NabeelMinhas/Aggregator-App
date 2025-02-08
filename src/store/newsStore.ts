import { create } from 'zustand';
import { Category, NewsFilters, NewsSource } from '../types/news';

interface NewsStore {
  filters: NewsFilters;
  setSearch: (search: string) => void;
  toggleSource: (source: NewsSource) => void;
  toggleCategory: (category: Category) => void;
  toggleAuthor: (author: string) => void;
  setDateRange: (startDate?: string, endDate?: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialFilters: NewsFilters = {
  search: '',
  sources: ['guardian', 'newsapi', 'nytimes'],
  categories: [], // Remove default category to get more diverse results
  authors: [],
  startDate: undefined,
  endDate: undefined,
  page: 1,
};

export const useNewsStore = create<NewsStore>((set) => ({
  filters: initialFilters,
  
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search, page: 1 },
    })),

  toggleSource: (source) =>
    set((state) => {
      const newSources = state.filters.sources.includes(source)
        ? state.filters.sources.filter((s) => s !== source)
        : [...state.filters.sources, source];
      
      // Ensure at least one source is selected
      return {
        filters: {
          ...state.filters,
          sources: newSources.length > 0 ? newSources : [source],
          page: 1,
        },
      };
    }),

  toggleCategory: (category) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categories: state.filters.categories.includes(category)
          ? state.filters.categories.filter((c) => c !== category)
          : [...state.filters.categories, category],
        page: 1,
      },
    })),

  toggleAuthor: (author) =>
    set((state) => ({
      filters: {
        ...state.filters,
        authors: state.filters.authors.includes(author)
          ? state.filters.authors.filter((a) => a !== author)
          : [...state.filters.authors, author],
        page: 1,
      },
    })),

  setDateRange: (startDate, endDate) =>
    set((state) => ({
      filters: { ...state.filters, startDate, endDate, page: 1 },
    })),

  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),

  resetFilters: () => set({ filters: initialFilters }),
}));