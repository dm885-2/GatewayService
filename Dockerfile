FROM node:16

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]