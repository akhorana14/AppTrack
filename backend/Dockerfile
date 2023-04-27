FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 9000

CMD ["npm", "start"]