FROM node:18-alpine

WORKDIR /app
COPY package.json .

RUN apk update && apk add bash
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]