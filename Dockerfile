FROM node:16.15.0
WORKDIR /app
COPY . .
COPY package.json .
COPY package-lock.json .
RUN npm i
ENV NODE_ENV development
CMD ["node", "index.js"]