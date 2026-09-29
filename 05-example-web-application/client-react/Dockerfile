FROM node:26-alpine3.23 AS base

WORKDIR /usr/app

COPY package*.json ./

# dev
FROM base as dev

RUN --mount=type=cache,target=/usr/app/.npm \
    npm set cache /usr/app/.npm && \
    npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# build step for production
FROM base as build

RUN --mount=type=cache,target=/usr/app/.npm \
    npm set cache /usr/app/.npm && \
    npm ci 

COPY . .

RUN npm run build

###

FROM nginxinc/nginx-unprivileged:1.31.5-alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/app/dist/ /usr/share/nginx/html

EXPOSE 8080
