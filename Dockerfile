FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
run npm run compile

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]