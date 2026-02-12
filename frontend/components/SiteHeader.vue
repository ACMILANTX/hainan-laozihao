<script setup lang="ts">
const site = await useSiteSettings()
const logoUrl = useImageSource(site.value.siteLogo, '/images/site-logo.svg')
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-red-200/70 bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-red-50 shadow-lg backdrop-blur">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img :src="logoUrl" alt="协会 Logo" class="h-10 w-10 rounded-full border border-yellow-300/50 bg-white/95 object-cover" />
        <div>
          <p class="text-lg font-extrabold tracking-wide">协会官网</p>
          <p class="text-xs text-red-100/80">红色国潮 · 凝心聚力</p>
        </div>
      </NuxtLink>

      <ul class="flex items-center gap-1 text-sm font-medium md:gap-2 md:text-base">
        <li><NuxtLink to="/" class="nav-link">首页</NuxtLink></li>
        <li><NuxtLink to="/members" class="nav-link">会员墙</NuxtLink></li>
        <li><NuxtLink to="/news" class="nav-link">协会新闻</NuxtLink></li>
        <li><NuxtLink to="/about" class="nav-link">关于协会</NuxtLink></li>
        <li><NuxtLink to="/contact" class="nav-link">联系我们</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  @apply rounded-md px-2 py-1 text-red-50/95 transition hover:bg-red-700/50 hover:text-yellow-200 md:px-3;
}
.router-link-active {
  @apply bg-red-700/60 text-yellow-200;
}
</style>
