FROM node:22.11-alpine

RUN npm install -g @angular/cli@16.2.16
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0