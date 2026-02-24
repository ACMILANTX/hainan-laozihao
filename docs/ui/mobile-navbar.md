# 移动端顶部导航兼容与展示优化

## 1. 现状核查与复现

前端工程目录：`frontend/`（Nuxt 3 + Tailwind）。

顶部导航相关实现：
- `frontend/components/SiteHeader.vue`
- `frontend/layouts/default.vue`

复现方式：启动 `npm run dev` 后，使用浏览器 DevTools 设备模拟。

复现结果（改造前）：
- 在 `375x667`（iPhone SE）与 `360x800`（Android 常见）下，顶部横向菜单和 Logo 同行展示，菜单项挤压明显，出现换行风险。
- 小屏幕下菜单项可用区域变窄，Logo 文案存在被挤压趋势，易出现可视层级拥挤。
- 导航为同层横排结构，缺少移动端专用展开容器，交互不符合移动端习惯。
- Header 虽为 sticky，但当内容挤压时高度与布局稳定性变差，易引发视觉抖动感。

## 2. 改造方案选择

采用 **方案 A：抽屉 Drawer**。

- 桌面端（`md` 及以上）保留原横向导航。
- 移动端（`md` 以下）改为 `Logo + 汉堡按钮`。
- 点击汉堡按钮后，从右侧滑出抽屉，包含纵向菜单列表与遮罩层。

## 3. 关键实现点

1. **断点策略**
   - 移动端隐藏横向菜单（`hidden md:flex`）。
   - 汉堡按钮仅移动端显示（`md:hidden`）。

2. **滚动锁定（防背景穿透）**
   - 打开抽屉时给 `body` 注入 `position: fixed`、`top`、`overflow: hidden`。
   - 关闭时恢复滚动位置，避免页面跳动。

3. **关闭行为完整性**
   - 点击遮罩关闭。
   - 按 `ESC` 关闭。
   - 菜单项跳转路由后自动关闭。

4. **安全区适配（iOS 刘海）**
   - Header 与抽屉头部增加 `padding-top: env(safe-area-inset-top)`。

5. **触控与可访问性**
   - 汉堡按钮与关闭按钮最小触控尺寸 `44px`（实现为 `h-11 min-w-11`）。
   - 抽屉容器设置 `role="dialog"` 与 `aria-modal="true"`。
   - 菜单开关按钮具备 `aria-label`、`aria-expanded`、`aria-controls`。

6. **长菜单可滚动**
   - 抽屉菜单区域 `overflow-y-auto`，避免内容撑高页面。

## 4. 测试清单

设备/分辨率：
- iPhone SE：`375x667`
- iPhone 12/13：`390x844`
- Android 常见：`360x800`

验收项：
- [x] 375 宽度仅显示 Logo + 汉堡按钮，无横向滚动条。
- [x] 汉堡菜单可展开；点击遮罩/ESC/路由跳转均可关闭。
- [x] 抽屉打开时背景滚动锁定。
- [x] iOS 安全区不遮挡顶部内容。
- [x] PC 端导航保持原有横向布局。
- [x] 基本可访问性语义满足（`aria-label`、`role="dialog"`）。
