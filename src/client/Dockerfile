FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript
RUN npm install -g serve

COPY ./src/client ./client
COPY ./src/_models ./_models
COPY ./src/_requests ./_requests
COPY ./src/_responses ./_responses
COPY ./src/_utils ./_utils

WORKDIR /usr/src/app/client

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-p", "3000"]