FROM node:14.15.5-stretch

RUN npm install -g @angular/cli@11.2.0
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

USER node

CMD ng serve --host 0.0.0.0