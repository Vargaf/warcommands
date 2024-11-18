FROM node:22.11-alpine

RUN npm install -g http-server

RUN mkdir /project

COPY warcommands-app/warcommands/dist/warcommands/browser /project

WORKDIR /project

CMD ["http-server", "-p", "8080", "-c-1", "/project"]