FROM node:20-alpine3.18 as base

WORKDIR /app

# Installation des dépendances
COPY package.json yarn.lock ./
COPY . .
RUN yarn install

# Build de l'application
RUN node ace build --ignore-ts-errors

# Préparation du build
WORKDIR /app/build
RUN yarn install --production
COPY .env .env

EXPOSE 3333

# Ajout de la commande de migration avant le démarrage du serveur
CMD node ace migration:refresh && node ./bin/server.js