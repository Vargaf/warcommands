# To launch
docker-compose -f /Users/dev/Projects/warcommands/devops/docker/dev/docker-compose.yml up

# To execute commands on the docker image
docker run -it --rm -v /Users/dev/Projects/warcommands/warcommands-app:/project warcommands_app_dev bash 