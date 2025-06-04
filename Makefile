################################################################################
# To be able to run this Makefile you need to have installed the gawk library
#
# Format found at https://gist.github.com/prwhite/8168133?permalink_comment_id=4700889#gistcomment-4700889
################################################################################

##
## To work on development environment
##

build: ## Builds the docker images
	@docker compose -f devops/docker/dev/docker-compose.yaml build

run: ## Runs the dockers to bring up the system
	@if [ ! -d "./project/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose.yaml run warcommands-dev npm install; fi
	@docker compose -f devops/docker/dev/docker-compose.yaml up --remove-orphans

run-detached: ## Runs the dockers to bring up the system in background
	@if [ ! -d "./project/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose.yaml run warcommands-dev npm install; fi
	@docker compose -f devops/docker/dev/docker-compose.yaml up --detach --remove-orphans

logs: ## Show the logs of the running container
	@docker compose -f devops/docker/dev/docker-compose.yaml logs -f

bash: ## To access to the running project container
	@docker compose -f devops/docker/dev/docker-compose.yaml run --remove-orphans warcommands-dev bash

stop: ## Stop the dockers to shut down the system
	@docker compose -f devops/docker/dev/docker-compose.yaml down --remove-orphans

##
## To work as on production environment
##

prod-build: ## Builds the dist folder to go to production
	@if [ ! -d "./project/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose.yaml run warcommands-dev npm install; fi
	@docker compose -f devops/docker/dev/docker-compose.yaml run --remove-orphans warcommands-dev npm run build

prod-preview: ## To preview the dist folder
	@if [ ! -d "./project/node_modules" ]; then docker compose -f devops/docker/dev/docker-compose.yaml run warcommands-dev npm install; fi
	@docker compose -f devops/docker/dev/docker-compose.yaml run -p 4173:4173 --remove-orphans warcommands-dev npm run preview

################################################################################
# To handle the npm dependencies
# https://www.npmjs.com/package/npm-check-updates
################################################################################

##
## To handle the npm dependencies
##
npm-outdated: ## List the outdated node packages
	@docker compose -f devops/docker/dev/docker-compose.yaml run --remove-orphans warcommands-dev npx npm-check-updates

npm-update: ## List the outdated node packages an asks which ones you want to update
	@docker compose -f devops/docker/dev/docker-compose.yaml run --remove-orphans warcommands-dev npx npm-check-updates --interactive --format group
##
## Help
##

################################################################################
# Help target
################################################################################
help:: ## show this help text
	@gawk -vG=$$(tput setaf 2) -vR=$$(tput sgr0) ' \
		match($$0, "^(([^#:]*[^ :]) *:)?([^#]*)##([^#].+|)$$",a) { \
			if (a[2] != "") { printf "    make %s%-18s%s %s\n", G, a[2], R, a[4]; next }\
			if (a[3] == "") { print a[4]; next }\
			printf "\n%-36s %s\n","",a[4]\
		}' $(MAKEFILE_LIST)
	@echo "" # blank line at the end
.DEFAULT_GOAL := help