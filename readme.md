# VetRadar FrontEnd/BackEnd Test
Shopping cart API with Typescript. 

## Requirements
- Node
- Docker

## The easy setup
- Clone the repository
- `docker-compose up` at the root level
    - ports `8080`, `3000` and `27017` must be available
- Point your browser to `localhost:3000`

## The more involved setup
- Clone the repository
- Will need a local MongoDB running (with no security)
- Run these commands from the root:
    - `npm i`
    - `npm run install-client`
    - `npm run install-server`
    - `npm run init-db`
    - `npm install -g nodemon`
    - `npm start`
- Point your browser to `localhost:3000`
