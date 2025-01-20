FROM node:20.18.0-slim

WORKDIR /mobile-app

COPY package.json package-lock.json ./

RUN npm install && npm install --global expo-cli && npm cache clean --force

COPY . .

CMD ["npx", "expo", "start", "--tunnel"]