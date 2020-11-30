FROM node:14.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD [ "node", "./dist/server.js" ] 