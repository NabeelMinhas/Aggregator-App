import React from 'react';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{article.source}</span>
          <span className="text-sm text-gray-500">
            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 truncate line-clamp-3">{article.description}</p>
        <div className="flex items-center justify-between">
          {article.author && (
            <span className="text-sm text-gray-500">By {article.author}</span>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            Read more <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}