FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
RUN mkdir -p /usr/share/nginx/html/whos-that-pokemon
COPY --from=builder /app/dist /usr/share/nginx/html/whos-that-pokemon
