import axios from 'axios';
import { Article, NewsFilters, PaginatedResponse } from '../types/news';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const ITEMS_PER_PAGE = 10;

const guardianApi = axios.create({
  baseURL: 'https://content.guardianapis.com',
});

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
});

export async function fetchGuardianNews(filters: NewsFilters): Promise<PaginatedResponse<Article>> {
  try {
    const { data } = await guardianApi.get('/search', {
      params: {
        'api-key': GUARDIAN_API_KEY,
        q: filters.search || undefined,
        section: filters.categories.join('|') || undefined,
        'from-date': filters.startDate,
        'to-date': filters.endDate,
        'show-fields': 'all',
        'page-size': ITEMS_PER_PAGE,
        page: filters.page,
      },
    });

    if (!data.response?.results) {
      return { data: [], total: 0, hasMore: false };
    }

    const articles = data.response.results.map((article: any) => ({
      id: article.id,
      title: article.webTitle,
      description: article.fields?.trailText || '',
      content: article.fields?.bodyText || '',
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      source: 'The Guardian',
      category: article.sectionName?.toLowerCase() || 'general',
      author: article.fields?.byline,
      publishedAt: article.webPublicationDate,
    }));

    return {
      data: articles,
      total: data.response.total,
      hasMore: data.response.pages > filters.page,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching Guardian news:', error.message);
    }
    return { data: [], total: 0, hasMore: false };
  }
}

export async function fetchNewsApi(filters: NewsFilters): Promise<PaginatedResponse<Article>> {
  try {
    // News API requires a search query or top-headlines category
    const isTopHeadlines = filters.categories.length > 0;
    const endpoint = isTopHeadlines ? '/top-headlines' : '/everything';
    
    const { data } = await newsApi.get(endpoint, {
      params: {
        q: filters.search || (isTopHeadlines ? undefined : 'news'),
        category: isTopHeadlines ? filters.categories[0] : undefined,
        language: 'en',
        country: isTopHeadlines ? 'us' : undefined,
        pageSize: ITEMS_PER_PAGE,
        page: filters.page,
        from: filters.startDate,
        to: filters.endDate,
        sortBy: 'publishedAt',
      },
    });

    if (!data.articles) {
      return { data: [], total: 0, hasMore: false };
    }

    const articles = data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      category: filters.categories[0] || 'general',
      author: article.author,
      publishedAt: article.publishedAt,
    }));

    return {
      data: articles,
      total: data.totalResults,
      hasMore: data.totalResults > filters.page * ITEMS_PER_PAGE,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching News API:', error.message);
    }
    return { data: [], total: 0, hasMore: false };
  }
}

export async function fetchNYTNews(filters: NewsFilters): Promise<PaginatedResponse<Article>> {
  try {
    const formatDate = (date: string | undefined) => 
      date ? date.replace(/-/g, '') : undefined;

    const { data } = await nytApi.get('/search/v2/articlesearch.json', {
      params: {
        'api-key': NYT_API_KEY,
        q: filters.search || undefined,
        begin_date: formatDate(filters.startDate),
        end_date: formatDate(filters.endDate),
        fq: filters.categories.length > 0 && !filters.categories.includes('general')
          ? `news_desk:(${filters.categories.join(' ')})`
          : undefined,
        page: filters.page - 1,
      },
    });

    if (!data.response?.docs) {
      return { data: [], total: 0, hasMore: false };
    }

    const articles = data.response.docs.map((article: any) => ({
      id: article._id,
      title: article.headline.main,
      description: article.abstract || article.snippet,
      content: article.lead_paragraph,
      url: article.web_url,
      imageUrl: article.multimedia?.[0]?.url 
        ? `https://www.nytimes.com/${article.multimedia[0].url}` 
        : undefined,
      source: 'The New York Times',
      category: article.news_desk?.toLowerCase() || 'general',
      author: article.byline?.original,
      publishedAt: article.pub_date,
    }));

    return {
      data: articles,
      total: data.response.meta.hits,
      hasMore: (filters.page - 1) * 10 < data.response.meta.hits,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching NYT news:', error.message);
    }
    return { data: [], total: 0, hasMore: false };
  }
}