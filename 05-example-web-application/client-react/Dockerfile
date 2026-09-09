FROM node:26-alpine3.23 AS build 

WORKDIR /usr/app

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci 

COPY . .

RUN npm run build

###

FROM nginxinc/nginx-unprivileged:1.31.5-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/app/dist/ /usr/share/nginx/html

EXPOSE 8080
