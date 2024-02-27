FROM node:18-alpine

WORKDIR /app
COPY package.json .

RUN apk update && apk add bash
RUN npm install && npm i -g nodemon

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]