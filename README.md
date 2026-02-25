# 协会官网项目（Nuxt3 + TailwindCSS + Strapi4 + PostgreSQL + Docker Compose + Nginx）

这是一个可直接运行的协会官网全栈模板，包含：

- 前端官网（Nuxt3 + TailwindCSS，响应式）
- 后台 CMS（Strapi 4）
- 数据库（PostgreSQL）
- 网关（Nginx 反向代理）
- Docker Compose 一键启动

## 功能清单

### 前端官网

- 首页（协会海报 Hero、会员墙、新闻卡片）
- 会员展示列表 `/members`（支持搜索 + Tag 筛选 + wallOrder 排序）
- 会员详情页 `/members/:slug`
- 新闻列表 `/news`
- 新闻详情页 `/news/:slug`
- 静态页 `/about`、`/contact`（内容来自 Strapi 的 Page 内容类型）
- 自动 SEO Meta（`useSeoMeta`）
- 动态主题（Strapi `slug=site` 配置驱动 CSS Variables）

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
2. 在 Settings -> Users & Permissions Plugin -> Roles -> Public 中开放对应集合的 `find` / `findOne` 权限（供前端公开访问）。
3. Page 建议至少维护三个 slug：
   - `site`（站点主题与海报配置）
   - `about`
   - `contact`

> 系统启动时会自动尝试创建 `about`、`contact`、`site` 三条默认页面内容（若不存在，幂等）。


## Users & Permissions 插件与 Public 只读权限

### 为什么后台可能看不到 Public / Authenticated

若 `backend/package.json` 缺少 `@strapi/plugin-users-permissions` 依赖，后台左侧不会出现 **Users & Permissions Plugin**，也就无法看到 `Public / Authenticated` 角色。

### 手工配置（后台操作）

1. 进入 `Settings -> Users & Permissions Plugin -> Roles -> Public`。
2. 分别勾选以下内容类型的只读权限：
   - `member`: `find`, `findOne`
   - `news`: `find`, `findOne`
   - `page`: `find`, `findOne`
3. 点击 Save。

> 项目已在 `backend/src/index.js` 的 bootstrap 中增加幂等初始化：启动时会自动确保 Public 角色具备上述只读权限，不会放开 create/update/delete。

## Strapi 字段说明（新增）

### Page（站点配置）

在 `slug=site` 的 Page 记录中配置：

- `themePrimary`：主色（例如 `#9f1239`）
- `themeBg`：页面背景色（例如 `#fff1f2`）
- `heroTitle`：首页海报主标题
- `heroSubtitle`：首页海报副标题
- `heroImage`：首页海报背景图（媒体库图片）
- `siteLogo`：站点 Logo（媒体库图片）
- `footerText`：页脚文案

### Member

- `brandStory`：品牌故事
- `city`：所在城市
- `tag`：会员标签（用于会员墙筛选）
- `tagColor`：标签颜色（如 `#b91c1c`）
- `wallOrder`：会员墙排序（数字越小越靠前）

### News

- `excerpt`：新闻卡片摘要
- `pinned`：是否置顶（true 优先展示）

## 后台配置主题 / 海报 / 页脚（操作指引）

1. 进入 Strapi 后台 Content Manager -> **Page**。
2. 打开 `slug=site` 的记录。
3. 配置 `themePrimary` / `themeBg`，保存后前端将自动写入 CSS variables。
4. 上传 `heroImage` 作为首页海报图，上传 `siteLogo` 作为头部 Logo。
5. 设置 `heroTitle` / `heroSubtitle` 修改首页海报文案。
6. 设置 `footerText` 修改底部版权/品牌文案。
7. 发布记录（Publish），刷新前端即可生效。

> 图片加载策略：优先使用 Strapi 配置图片；若未配置则自动回退到 `frontend/public/images` 默认图片。


## 后台语言切换（Admin i18n）

项目已在 `backend/config/admin.js` 启用 Admin 可选语言：`en` 与 `zh-Hans`。

### 切换步骤

1. 登录 Strapi 后台（`/admin`）。
2. 点击右上角用户菜单，进入 `Profile`。
3. 在语言（Interface language）中选择 `中文（简体）/ zh-Hans`，保存后界面即时切换。

### 若看不到中文选项

- 检查 `backend/config/admin.js` 是否包含：`locales: ['en', 'zh-Hans']`。
- 修改配置后需要重新构建后台：`cd backend && npm run build`。
- 若使用容器部署，请重建并重启容器（例如 `docker compose up -d --build`）以加载新的 Admin 构建产物。

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


## 公共官网上线 checklist

- [ ] `docker compose up -d --build` 可正常启动前后端与数据库。
- [ ] 首次登录 `http://localhost/admin` 已创建管理员账号。
- [ ] 后台左侧已出现 **Users & Permissions Plugin**，并可见 `Public / Authenticated` 角色。
- [ ] Public 角色已开启只读权限：`member/news/page` 的 `find` 与 `findOne`。
- [ ] 匿名访问验证通过：
  - [ ] `GET /api/members`、`GET /api/members/:id`
  - [ ] `GET /api/news`、`GET /api/news/:id`
  - [ ] `GET /api/pages`、`GET /api/pages/:id`
- [ ] 写接口仍受保护（例如 `POST /api/members` 返回 `401/403`）。
- [ ] `slug=site` 的 Page 已配置主题色、首页文案、页脚文案并发布。
- [ ] Nginx / 域名 / HTTPS（如有）已按生产要求配置。

