################################################################################
# To be able to run this Makefile you need to have installed the gawk library
#
# Format found at https://gist.github.com/prwhite/8168133?permalink_comment_id=4700889#gistcomment-4700889
################################################################################

##
## To work on development environment
##

dev-build: ## Builds the docker images
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml build

run: ## Runs the dockers to bring up the system
	@if [ ! -d "./warcommands-app/warcommands/node_modules" ]; then docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app npm install; fi
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml up --detach

logs: ## Show the logs of the running container
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml logs -f

stop: ## Stop the dockers to shut down the system
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml down

bash: ## To access to the running project container
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app sh

##
## To work on production environment
##

dist-build: ## Builds the dist folder and builds the docker image
	@if [ ! -d "./warcommands-app/warcommands/node_modules" ]; then docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app npm install; fi
	@docker compose -f devops/docker/argo-workflow-test-dev/docker-compose.yml run warcommands-app ng build
	@docker buildx build -t registry.warcommands.com/warcommands-prod -f devops/docker/argo-workflow-test-prod/Dockerfile .

prod-image-push: ## Push the prod image to the registry
	@docker image push registry.warcommands.com/warcommands-prod:latest

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