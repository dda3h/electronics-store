FROM node

WORKDIR /app/client

COPY package.json /app/client

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
