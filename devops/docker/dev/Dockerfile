FROM node:13.7.0-stretch

RUN npm install -g @angular/cli@8.1.1
RUN npm install -g http-server

RUN mkdir /project

WORKDIR /project

CMD ng serve --host 0.0.0.0