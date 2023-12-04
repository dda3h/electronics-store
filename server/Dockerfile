FROM node

WORKDIR /app/server

COPY package.json /app/server

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
