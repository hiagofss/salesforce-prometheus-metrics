FROM node:lts-alpine

ARG PORT=3333
ENV PORT=${PORT}

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install -g npm@latest

RUN npm install

USER node

EXPOSE ${PORT}

CMD npm run dev