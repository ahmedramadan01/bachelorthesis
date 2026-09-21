FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install && \
    npm install jsdom

RUN apt-get update && \
    apt-get install -y iputils-ping && \
    apt-get install -y iperf && \
    apt-get install -y nano && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*

COPY . .


CMD [ "npm", "start" ]