# syntax=docker/dockerfile:1.6
FROM node:20-bullseye-slim

WORKDIR /opt/app

# 电信国内：换 Debian 国内镜像 + 开启 apt 缓存
RUN sed -i 's|http://deb.debian.org/debian|http://mirrors.aliyun.com/debian|g' /etc/apt/sources.list \
 && sed -i 's|http://security.debian.org/debian-security|http://mirrors.aliyun.com/debian-security|g' /etc/apt/sources.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && update-ca-certificates \
 # 装好 CA 后再切回 https（之后就能正常校验）
 && sed -i 's|http://mirrors.aliyun.com/debian|https://mirrors.aliyun.com/debian|g' /etc/apt/sources.list \
 && sed -i 's|http://mirrors.aliyun.com/debian-security|https://mirrors.aliyun.com/debian-security|g' /etc/apt/sources.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libvips-dev \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# npm 也加缓存（国内更明显）
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN mkdir -p public/uploads
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]