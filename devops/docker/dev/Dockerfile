FROM node:22.11-alpine

RUN npm install -g @angular/cli@17.3.11
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0