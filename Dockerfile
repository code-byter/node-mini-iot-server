FROM node:13

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run compile

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]