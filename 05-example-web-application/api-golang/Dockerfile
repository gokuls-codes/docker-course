FROM golang:1.27.1-alpine3.24 AS base

RUN apk add --no-cache gcc musl-dev

WORKDIR /app

COPY go.mod go.sum .

RUN go mod download

FROM base AS dev

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go install github.com/air-verse/air@latest && \
    go install github.com/go-delve/delve/cmd/dlv@latest

COPY . .

EXPOSE 8000 4000

CMD ["air", "-c", ".air.toml"]

FROM base AS build

RUN adduser -D -u 1001 nonroot

COPY . .

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build \
    -ldflags="-linkmode external -extldflags -static" \
    -tags netgo \
    -o api-golang

###

FROM scratch AS production

ENV GIN_MODE=release

COPY --from=build /etc/passwd /etc/passwd

COPY --from=build /app/api-golang api-golang

USER nonroot

EXPOSE 8080

CMD ["./api-golang"]
