FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for API keys
ARG VITE_GUARDIAN_API_KEY
ARG VITE_NEWS_API_KEY
ARG VITE_NYT_API_KEY

# Set environment variables for build
ENV VITE_GUARDIAN_API_KEY=$VITE_GUARDIAN_API_KEY
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_NYT_API_KEY=$VITE_NYT_API_KEY

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
