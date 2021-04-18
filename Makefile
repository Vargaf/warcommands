# Makefile for zinio-travel-man
# vim: set ft=make ts=8 noet

.PHONY: help
help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Targets
#
.PHONY: build
build: ### Builds the docker images
	docker-compose -f devops/docker/dev/docker-compose.yml build

.PHONY: run
run: ### Runs the dockers to bring up the system
	docker-compose -f devops/docker/dev/docker-compose.yml up

.PHONY: bash
bash: ### Runs the dockers to bring up the system
	docker-compose -f devops/docker/dev/docker-compose.yml run warcommands_app bash

.PHONY: prod
prod: ### Runs the dockers to bring up the system
	docker-compose -f devops/docker/dev/docker-compose.yml run warcommands_app ng build --prod

