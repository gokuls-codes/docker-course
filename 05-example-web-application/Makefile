DATABASE_URL:=postgres://postgres:password@localhost:5432/postgres
DOCKER_DATABASE_URL:=postgres://postgres:password@db:5432/postgres

.PHONY: docker-build-all
docker-build-all:
	docker build -t client-react-nginx -f ./client-react/Dockerfile ./client-react
	docker build -t api-node -f ./api-node/Dockerfile ./api-node
	docker build -t api-golang -f ./api-golang/Dockerfile ./api-golang

.PHONY: docker-run-all
docker-run-all:
	$(MAKE) docker-stop

	$(MAKE) docker-rm

	docker network create my-network

	docker run -d \
		--name db \
		--network my-network \
		-e POSTGRES_PASSWORD=password \
		-v pgdata:/var/lib/postgresql \
		-p 5432:5432 \
		--restart unless-stopped \
		postgres:18.6-alpine

	docker run -d \
		--name api-node \
		--network my-network \
		-e DATABASE_URL=$(DOCKER_DATABASE_URL) \
		-e PORT=3000 \
		-p 3000:3000 \
		--restart unless-stopped \
		api-node

	docker run -d \
		--name api-golang \
		--network my-network \
		-e DATABASE_URL=$(DOCKER_DATABASE_URL) \
		-e PORT=8000 \
		-p 8000:8000 \
		--restart unless-stopped \
		api-golang

	docker run -d \
		--name client-react-nginx \
		--network my-network \
		-p 80:8080 \
		--restart unless-stopped \
		client-react-nginx

.PHONY: docker-stop
docker-stop:
	-docker stop db
	-docker stop api-node
	-docker stop api-golang
	-docker stop client-react-nginx

.PHONY: docker-rm
docker-rm:
	-docker container rm db
	-docker container rm api-node
	-docker container rm api-golang
	-docker container rm client-react-nginx
	-docker network rm my-network

.PHONY: run-postgres
run-postgres:
	@echo Starting postgres container
	-docker run \
	-e POSTGRES_PASSWORD=password \
	-v pgdata:/var/lib/postgresql \
	-p 5432:5432 \
	postgres:18.6-alpine

.PHONY: run-api-node
run-api-node:
	@echo Starting node api
	cd api-node && DATABASE_URL=$(DATABASE_URL) npm run dev

.PHONY: run-api-golang
run-api-golang:
	@echo Starting golang api
	cd api-golang && DATABASE_URL=$(DATABASE_URL) go run main.go

.PHONY: run-client-react
run-client-react:
	@echo Starting react client
	cd client-react && npm run dev
