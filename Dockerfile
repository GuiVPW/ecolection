FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY --chown=node:node package.json yarn.* ./

RUN yarn global add pm2

USER node

RUN yarn && yarn add esm

COPY --chown=node:node . .

EXPOSE 3000

CMD ["pm2-docker", "process.json"]
