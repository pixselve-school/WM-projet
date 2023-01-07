FROM node:19-alpine3.16 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.23.3-alpine-slim
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
