FROM node:20-slim

WORKDIR /srv/app/

COPY package*.json ./
RUN npm install --save-dev @rollup/rollup-linux-x64-gnu
RUN npm install
RUN npm install --save-dev @rollup/rollup-linux-x64-gnu

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
