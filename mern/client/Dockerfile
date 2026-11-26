FROM node:22-alpine AS builder
workdir /app
copy package*.json ./
run npm ci
copy . .
run npm run build

from cgr.dev/chainguard/nginx:latest
workdir /usr/share/nginx/html
copy --from=builder /app/dist ./
copy nginx.conf /etc/nginx/nginx.conf
expose 8080
CMD ["-g", "daemon off;"]