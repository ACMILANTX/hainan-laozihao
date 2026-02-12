# 协会官网项目（Nuxt3 + TailwindCSS + Strapi4 + PostgreSQL + Docker Compose + Nginx）

这是一个可直接运行的协会官网全栈模板，包含：

- 前端官网（Nuxt3 + TailwindCSS，响应式）
- 后台 CMS（Strapi 4）
- 数据库（PostgreSQL）
- 网关（Nginx 反向代理）
- Docker Compose 一键启动

## 功能清单

### 前端官网

- 首页
- 会员展示列表 `/members`
- 会员详情页 `/members/:slug`
- 新闻列表 `/news`
- 新闻详情页 `/news/:slug`
- 静态页 `/about`、`/contact`（内容来自 Strapi 的 Page 内容类型）
- 自动 SEO Meta（`useSeoMeta`）

### Strapi 后台

- 会员管理（Member）
- 新闻管理（News）
- 页面管理（Page）
- 提供 REST API：
  - `/api/members`
  - `/api/news`
  - `/api/pages`

## 目录结构

```bash
.
├── backend/                # Strapi 4 项目
│   ├── config/             # 数据库、服务、后台等配置
│   ├── src/api/            # Member/News/Page 内容类型及路由
│   ├── Dockerfile
│   └── .env.example
├── frontend/               # Nuxt3 前端项目
│   ├── pages/              # 页面路由
│   ├── composables/
│   ├── types/
│   ├── assets/css/
│   └── Dockerfile
├── nginx/
│   └── default.conf        # Nginx 反向代理配置
└── docker-compose.yml
```

## 一键启动

> 需要本地安装 Docker 与 Docker Compose。

```bash
docker compose up -d --build
```

启动后访问：

- 官网首页：`http://localhost/`
- Strapi 后台：`http://localhost/admin`
- REST API 示例：`http://localhost/api/members`

## 首次初始化说明（Strapi）

首次访问 `/admin` 时，请按页面提示创建管理员账号。

创建完成后：

1. 在 Content Manager 中添加 Member / News / Page 数据。
2. 在 Settings -> Roles -> Public 中开放对应集合的 `find` / `findOne` 权限（供前端公开访问）。
3. Page 建议至少维护两个 slug：
   - `about`
   - `contact`

> 系统启动时会自动尝试创建 `about` 和 `contact` 两条默认页面内容（若不存在）。

## 开发说明（可选）

如需本地分别开发，可进入子项目：

```bash
# 前端
cd frontend
npm install
npm run dev

# 后台
cd backend
npm install
cp .env.example .env
npm run develop
```

## 生产部署建议

- 替换 `docker-compose.yml` 中默认密钥与数据库密码。
- 为 Nginx 配置 HTTPS（如接入 Let's Encrypt）。
- 根据业务为 Strapi 增加上传对象存储与备份策略。


## 前端国潮主题测试与预览

### 本地开发预览

```bash
cd frontend
npm install
npm run dev
```

访问 `http://localhost:3000` 预览首页海报、会员墙卡片网格、新闻卡片网格。

### Docker 一体预览

```bash
docker compose up -d --build
```

访问：
- `http://localhost/`：前端页面（国潮主题）
- `http://localhost/admin`：Strapi 管理后台
- `http://localhost/api/members`：REST API 示例

### 验收建议

1. 检查首页 Hero 是否为“协会海报”视觉。
2. 检查“会员墙”在移动端/平板/桌面端的网格自适应。
3. 检查新闻列表卡片网格布局与跳转详情。
4. 打开页面源码确认每个页面 `title` 与 `meta description` 已输出。
