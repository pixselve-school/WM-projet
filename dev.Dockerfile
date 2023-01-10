FROM node:19-alpine3.16

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
EXPOSE 4200 49153
CMD npm run start-docker-dev
