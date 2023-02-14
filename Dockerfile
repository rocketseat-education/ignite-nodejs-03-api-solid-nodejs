FROM node:18-alpine3.16 AS migration
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
ENV npm_config_yes true
WORKDIR /var/app
RUN mkdir src
COPY prisma prisma/
CMD npx prisma migrate deploy

FROM node:18-alpine3.16 AS dependencies
WORKDIR /var/app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

FROM node:18-alpine3.16 AS build
ENV NODE_ENV production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN npm run build

FROM node:18-alpine3.16 AS prodDependencies
ENV NODE_ENV production
WORKDIR /var/app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine3.16 AS package
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
WORKDIR /var/app
RUN mkdir src
COPY --from=prodDependencies /var/app/package.json package.json
COPY --from=prodDependencies /var/app/node_modules node_modules/
COPY --from=build /var/app/build build/
COPY --from=build /var/app/prisma prisma/
RUN wget -O /var/app/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
  chmod -v +x /var/app/dumb-init
RUN npx prisma generate
RUN npx pkg@5.8.0 . -o api
RUN chmod -v +x /var/app/api

FROM node:18-alpine3.16 AS runtime
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
WORKDIR /var/app
USER node
COPY --chown=node:node --from=package /var/app/src /src/
COPY --chown=node:node --from=package /var/app/src src/
COPY --chown=node:node --from=package /var/app/dumb-init dumb-init
COPY --chown=node:node --from=package /var/app/api api
ENTRYPOINT ["/var/app/dumb-init", "--"]
CMD ["/var/app/api"]