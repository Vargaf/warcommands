.PHONY: help
help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Targets
#
.PHONY: build
build: ### Builds the docker images
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml build

.PHONY: run
run: ### Runs the dockers to bring up the system
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml up

.PHONY: stop
stop: ### Stop the dockers to shut down the system
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml down

.PHONY: bash
bash: ### Runs the dockers to bring up the system
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app bash

.PHONY: dist-build
dist-build: ### Builds the dist folder and builds the docker image
	@if [ ! -d "./warcommands-app/warcommands/node_modules" ]; then docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app npm install; fi
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app ng build
	@docker buildx build -t registry.warcommands.com/warcommands-prod -f devops/docker/argo-workflow-test-prod/Dockerfile .

.PHONY: prod-image-push
prod-image-push: ### Push the prod image to the registry
	@docker image push registry.warcommands.com/warcommands-prod:latest