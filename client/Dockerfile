# syntax=docker/dockerfile:1

FROM node:18-alpine as build

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci --omit=dev

COPY . .

RUN npm run build

FROM nginx:1.25.1-alpine-slim as release

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
