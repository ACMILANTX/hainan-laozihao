FROM node:20-alpine AS builder
WORKDIR /app

# 仅优化 npm 源（国内电信更稳）
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]