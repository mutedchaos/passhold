FROM node:15-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
WORKDIR /app/packages/web
COPY packages/web/package*.json ./
RUN npm ci
COPY packages/web ./
RUN npm run build

FROM nginx:latest AS web
RUN sed -ib s_80_3000_g /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/web/build /usr/share/nginx/html

