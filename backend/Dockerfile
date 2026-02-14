FROM node:20-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
RUN npm install react@^18.0.0 react-dom@^18.0.0 react-router-dom@^5.2.0 styled-components@^5.2.1

COPY . .
ENV NODE_ENV=production
ENV CI=true
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
