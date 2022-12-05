FROM node:alpine

WORKDIR /app

COPY . /app/

EXPOSE 3001

RUN npm install 

RUN apk update && apk add bash

CMD ["npm", "start"]