FROM node:13

# Create app directory
WORKDIR /usr/src/app

ADD package*.json ./
ADD src/ ./src/
ADD ts*.json ./
ADD mini-iot-config.json ./
RUN npm install
RUN npm run compile


EXPOSE 8000

CMD [ "npm", "run", "start" ]