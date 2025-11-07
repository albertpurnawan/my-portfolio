# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build
COPY . ./
RUN npm run build

# Stage 2: Serve static files with nginx
FROM nginx:1.27-alpine

# Remove default nginx site config and add our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK CMD wget --spider -q http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

