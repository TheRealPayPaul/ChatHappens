FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV WEBSERVER_PORT=3000
ENV JWT_SECRET=mc5^$fedR8w<&pEEr4/Wp6m]K64u7M}J
ENV JWT_TTL_DAYS=1

EXPOSE 3000

CMD [ "npm", "start" ]
