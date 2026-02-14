FROM node:20-alpine
WORKDIR /app

# 仅优化 npm 源（国内电信更稳）
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]