# News Aggregator

A modern news aggregation platform that combines articles from multiple sources including The Guardian, News API, and The New York Times. Built with React, TypeScript, and Tailwind CSS.

![News Aggregator Screenshot](https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200&h=600)

## Features

- 🔍 Real-time news search across multiple sources
- 📱 Responsive design for all devices
- 🏷️ Category-based filtering
- 📅 Date range selection
- 📰 Multiple news sources integration
- ⚡ Fast and efficient with pagination
- 🎨 Clean and modern UI

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ and npm
- Docker (optional, for containerized deployment)
- API keys for:
  - [The Guardian](https://open-platform.theguardian.com/access/)
  - [News API](https://newsapi.org/register)
  - [New York Times](https://developer.nytimes.com/get-started)

## Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Aggregator-App
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_GUARDIAN_API_KEY=your_guardian_api_key(17ba1968-bc03-4466-a594-4e84edf8b388)
   VITE_NEWS_API_KEY=your_news_api_key(65c5848ef92d4ee89fe6eac076114b8b)
   VITE_NYT_API_KEY=your_nyt_api_key(LLzGYQqTS78Yp3u8bdUC4ymCPQsGXsMY)
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Docker Deployment

1. Build the Docker image with your API keys:
   ```bash
   docker build \
     --build-arg VITE_GUARDIAN_API_KEY=your_guardian_api_key \
     --build-arg VITE_NEWS_API_KEY=your_news_api_key \
     --build-arg VITE_NYT_API_KEY=your_nyt_api_key \
     -t aggregator-app .
   ```

2. Run the container:
   ```bash
   docker run -d -p 8080:80 aggregator-app
   ```

3. Access the application at [http://localhost:8080](http://localhost:8080)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # React components
│   ├── Filters.tsx
│   └── NewsCard.tsx
├── services/      # API services
│   └── api.ts
├── store/         # State management
│   └── newsStore.ts
├── types/         # TypeScript types
│   └── news.ts
└── App.tsx        # Main application component
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GUARDIAN_API_KEY` | The Guardian API key |
| `VITE_NEWS_API_KEY` | News API key |
| `VITE_NYT_API_KEY` | New York Times API key |

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- TanStack Query
- Zustand
- Axios
- Docker

## Troubleshooting

### API Key Issues

If you're seeing 401 Unauthorized errors:
1. Verify your API keys are correct
2. Check that environment variables are properly set
3. For Docker builds, ensure API keys are passed as build arguments

### Docker Issues

If the application isn't working in Docker:
1. Verify the container is running: `docker ps`
2. Check container logs: `docker logs <container-id>`
3. Ensure API keys were properly passed during build
4. Try rebuilding the image with `--no-cache` flag

## License

This project is licensed under the MIT License.

## Acknowledgments

- [The Guardian Open Platform](https://open-platform.theguardian.com/)
- [News API](https://newsapi.org/)
- [The New York Times Developer Network](https://developer.nytimes.com/)
