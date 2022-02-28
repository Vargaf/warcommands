FROM node:16.14.0-stretch

RUN npm install -g @angular/cli@13.2.3
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0