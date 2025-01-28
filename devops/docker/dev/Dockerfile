FROM node:14.15.0-stretch

RUN npm install -g @angular/cli@14.2.13
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0