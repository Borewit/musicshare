FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm i

RUN npx lerna bootstrap --scope @musicshare/backend --include-filtered-dependencies
RUN npx lerna run build --scope @musicshare/backend --include-filtered-dependencies

ENV NODE_ENV production
EXPOSE 4000

CMD node projects/backend/build/index.js