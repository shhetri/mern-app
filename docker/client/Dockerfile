FROM node:11.10.0-alpine
WORKDIR /usr/src/app
COPY ./client/package.json .
COPY ./client/yarn.lock .
RUN yarn install
EXPOSE 8080
CMD ["yarn", "dev"]
