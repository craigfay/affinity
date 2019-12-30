FROM node:12

RUN mkdir /code

COPY package.json /code
COPY src /code/src

WORKDIR /code

RUN npm install

CMD npx ts-node src/main