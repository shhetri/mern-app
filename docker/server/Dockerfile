FROM node:11.10.0-alpine
WORKDIR /usr/src/app
COPY ./server/package.json .
COPY ./server/yarn.lock .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "dev"]
