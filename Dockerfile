FROM node:16.14.2-alpine

WORKDIR /usr/app
RUN apk add git
RUN npm i -g @nestjs/cli
RUN npm install -D prisma
RUN npx prisma init
COPY package*.json ./
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

EXPOSE 3000

CMD ["npm", "run", "start:dev"]