import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { Newspaper, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsCard } from './components/NewsCard';
import { Filters } from './components/Filters';
import { useNewsStore } from './store/newsStore';
import { fetchGuardianNews, fetchNewsApi, fetchNYTNews } from './services/api';
import { Article } from './types/news';

function App() {
  const { filters, setPage } = useNewsStore();

  const results = useQueries({
    queries: filters.sources.map((source) => ({
      queryKey: ['news', source, filters],
      queryFn: async () => {
        switch (source) {
          case 'guardian':
            return fetchGuardianNews(filters);
          case 'newsapi':
            return fetchNewsApi(filters);
          case 'nytimes':
            return fetchNYTNews(filters);
        }
      },
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data?.data || []).flat();
  const totalItems = results.reduce((acc, result) => acc + (result.data?.total || 0), 0);
  const hasMore = results.some((result) => result.data?.hasMore);

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setPage(filters.page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(filters.page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">News Aggregator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters />

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading news. Please try again later.</p>
          </div>
        ) : !data.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.map((article: Article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={filters.page === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {filters.page} • {totalItems} articles
              </span>
              <button
                onClick={handleNextPage}
                disabled={!hasMore}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;