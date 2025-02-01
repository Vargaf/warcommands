FROM node:22.11-bookworm

RUN npm install -g @angular/cli@18.2.14
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0