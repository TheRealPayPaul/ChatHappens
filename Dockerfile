FROM node:18 as be-builder
WORKDIR /be
COPY Backend/package*.json ./
RUN npm install
COPY Backend .
RUN npm run RebuildPrismaClient
RUN npm run build

FROM node:18
WORKDIR /app
COPY Backend/package*.json ./
COPY Backend/prisma prisma/
RUN npm install
COPY --from=be-builder /be/dist .
ENV JWT_SECRET=mc5^$fedR8w<&pEEr4/Wp6m]K64u7M}J
ENV JWT_TTL_DAYS=1
EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]
