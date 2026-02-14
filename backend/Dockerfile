FROM node:20-bullseye-slim

WORKDIR /opt/app

# sharp 在网络受限时会从下载预编译包回退到源码编译，提前准备编译与 libvips 依赖
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    pkg-config \
    libvips-dev \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN mkdir -p public/uploads
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
