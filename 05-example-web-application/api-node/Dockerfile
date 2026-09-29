FROM node:26-alpine3.23  as base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM base as production

ENV NODENV=production

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

USER node

COPY --chown=node:node ./src .

EXPOSE 3000

CMD ["node", "index.js"] 
