.PHONY: help
help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Targets
#
.PHONY: build
build: ### Builds the docker images
	@docker compose -f devops/docker/dev/docker-compose.yml build

.PHONY: run
run: ### Runs the dockers to bring up the system
	@if [ ! -d "./warcommands-app/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose.yml run warcommands_app npm install; fi
	@docker compose -f devops/docker/dev/docker-compose.yml up

.PHONY: run-build
run-build: ### Builds the dist and serves it
	@if [ ! -d "./warcommands-app/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose-build.yml run warcommands_pwa npm install; fi
	@docker compose -f devops/docker/dev/docker-compose-build.yml run warcommands_pwa ng build --configuration production
	@docker compose -f devops/docker/dev/docker-compose-build.yml up

.PHONY: stop
stop: ### Stop the dockers to shut down the system
	@docker compose -f devops/docker/dev/docker-compose.yml down

.PHONY: bash
bash: ### Runs the dockers to bring up the system
	@docker compose -f devops/docker/dev/docker-compose.yml run warcommands_app bash

.PHONY: prod
prod: ### Runs the dockers to bring up the system
	@docker compose -f devops/docker/dev/docker-compose.yml run warcommands_app ng build --configuration production

.PHONY: test
test: ### Runs the tests
	@if [ ! -d "./warcommands-app/node_modules" ]; then docker compose -f ddevops/docker/test/docker-compose.yml run warcommands_app_test npm install; fi
	@docker compose -f devops/docker/test/docker-compose.yml run -p 127.0.0.1:9876:9876 warcommands_app_test ng test
