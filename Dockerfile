FROM node:12.8.1 AS base
WORKDIR /app

FROM base AS dependencies  
COPY package*.json ./
RUN npm install

FROM dependencies AS build  
WORKDIR /app
COPY dist/fitness-tracker /app/dist
COPY server.js /app

FROM node:alpine AS release  
WORKDIR /app
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app ./

CMD ["node", "server.js"]