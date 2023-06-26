FROM node:18 as builder
WORKDIR /be
COPY Backend/package*.json ./
RUN npm install
COPY Backend .
RUN npm run RebuildPrismaClient
RUN npm run build

WORKDIR /fe
COPY frontend/package*.json ./
RUN npm install --omit=dev
COPY frontend .
RUN node_modules/.bin/ng build

FROM node:18
WORKDIR /app
COPY Backend/package*.json ./
COPY Backend/prisma prisma/
RUN npm install --omit=dev
COPY --from=builder /be/dist .
COPY --from=builder /fe/dist/frontend public/
ENV WEBSERVER_PORT=3000
EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]
