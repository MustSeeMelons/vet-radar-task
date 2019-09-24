FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript

COPY ./src/server ./server
COPY ./src/_models ./_models
COPY ./src/_requests ./_requests
COPY ./src/_responses ./_responses
COPY ./src/_utils ./_utils

WORKDIR /usr/src/app/server
RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/server/src/index.js" ]