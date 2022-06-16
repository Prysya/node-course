
FROM node:16.15 AS build
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:16.15
WORKDIR /usr/src/app

COPY package.json .

ARG NODE_ENV=production

RUN npm install

COPY --from=build /usr/src/app/dist dist

EXPOSE 3000

CMD ["npm", "run", "start"]
