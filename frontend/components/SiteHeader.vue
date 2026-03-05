<script setup lang="ts">
const isMenuOpen = ref(false)
const site = await useSiteSettings()
const logoUrl = useImageSource(site.value.siteLogo, '/images/site-logo.svg')

const navItems = [
  { to: '/', label: '首页' },
  { to: '/members', label: '会员墙' },
  { to: '/news', label: '协会新闻' },
  { to: '/about', label: '关于协会' },
  { to: '/contact', label: '联系我们' }
]

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-red-200/70 bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-red-50 shadow-lg backdrop-blur">
    <nav class="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
      <div class="flex items-center justify-between gap-3">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img :src="logoUrl" alt="协会 Logo" class="h-10 w-10 rounded-full border border-yellow-300/50 bg-white/95 object-cover" />
        <div class="min-w-0">
          <p class="truncate text-base font-extrabold tracking-wide sm:text-lg">海南省老字号企业协会</p>
          <!-- <p class="text-xs text-red-100/80">红色国潮 · 凝心聚力</p> -->
        </div>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-red-200/40 text-red-50 transition hover:bg-red-700/40 md:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="切换导航菜单"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="text-xl leading-none">{{ isMenuOpen ? '×' : '☰' }}</span>
      </button>

      <ul class="hidden items-center gap-1 text-sm font-medium md:flex md:gap-2 md:text-base">
        <li v-for="item in navItems" :key="item.to"><NuxtLink :to="item.to" class="nav-link">{{ item.label }}</NuxtLink></li>
      </ul>
      </div>

      <ul
        id="mobile-menu"
        class="mt-3 grid gap-2 border-t border-red-200/30 pt-3 text-sm font-medium md:hidden"
        :class="isMenuOpen ? 'grid' : 'hidden'"
      >
        <li v-for="item in navItems" :key="`mobile-${item.to}`">
          <NuxtLink :to="item.to" class="mobile-nav-link" @click="closeMenu">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  @apply rounded-md px-2 py-1 text-red-50/95 transition hover:bg-red-700/50 hover:text-yellow-200 md:px-3;
}
a.nav-link.router-link-active {
  @apply bg-red-700/60 text-yellow-200;
}

.mobile-nav-link {
  @apply block rounded-md px-3 py-2 text-red-50/95 transition hover:bg-red-700/50 hover:text-yellow-200;
}

a.mobile-nav-link.router-link-active {
  @apply bg-red-700/60 text-yellow-200;
}
</style>
