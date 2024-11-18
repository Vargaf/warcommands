FROM node:22.11-alpine

RUN npm install -g @angular/cli@18.2.11
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

CMD ng serve --host 0.0.0.0