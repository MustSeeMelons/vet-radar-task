FROM mongo:4.2.0

ENV MONGO_INITDB_DATABASE="VET_RADAR_TEST"

COPY mongoInit.js /docker-entrypoint-initdb.d/

EXPOSE 27017:27017

CMD ["mongod"]