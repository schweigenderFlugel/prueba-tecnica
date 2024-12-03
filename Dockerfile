FROM node:18-alpine3.18 as base

ENV DIR /app
WORKDIR $DIR

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build; \ npm install --only=production

CMD ["npm", "build", "npm", "start" ]