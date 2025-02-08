import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useNewsStore } from '../store/newsStore';
import { Category, NewsSource } from '../types/news';

const sources: { id: NewsSource; label: string }[] = [
  { id: 'guardian', label: 'The Guardian' },
  { id: 'newsapi', label: 'News API' },
  { id: 'nytimes', label: 'New York Times' },
];

const categories: { id: Category; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
];

export function Filters() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { filters, setSearch, toggleSource, toggleCategory, setDateRange, resetFilters } = useNewsStore();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search news..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Filter size={20} />
          Filters
        </button>
        {(filters.search || filters.sources.length < sources.length || filters.categories.length < categories.length) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <X size={20} />
            Reset
          </button>
        )}
      </div>

      {isOpen && (
        <div className="relative bg-white p-4 rounded-lg border mt-2">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Sources</h3>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`px-3 py-1 rounded-full ${
                      filters.sources.includes(source.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 rounded-full ${
                      filters.categories.includes(category.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Date Range</h3>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => setDateRange(e.target.value, filters.endDate)}
                  className="px-3 py-1 border rounded-lg"
                />
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => setDateRange(filters.startDate, e.target.value)}
                  className="px-3 py-1 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}