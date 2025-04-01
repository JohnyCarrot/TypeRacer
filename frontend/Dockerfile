FROM node:20

WORKDIR /container_thingz_do_not_touch

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
