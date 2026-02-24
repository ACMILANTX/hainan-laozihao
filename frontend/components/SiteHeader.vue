<script setup lang="ts">
const site = await useSiteSettings()
const logoUrl = useImageSource(site.value.siteLogo, '/images/site-logo.svg')

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/members', label: '会员墙' },
  { to: '/news', label: '协会新闻' },
  { to: '/about', label: '关于协会' },
  { to: '/contact', label: '联系我们' }
]

const route = useRoute()
const mobileMenuOpen = ref(false)
let scrollTop = 0

const lockBodyScroll = () => {
  scrollTop = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollTop}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  window.scrollTo(0, scrollTop)
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const onEscapeClose = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

watch(mobileMenuOpen, (isOpen) => {
  if (!import.meta.client) {
    return
  }

  if (isOpen) {
    lockBodyScroll()
    return
  }

  unlockBodyScroll()
})

watch(() => route.fullPath, () => {
  closeMobileMenu()
})

onMounted(() => {
  window.addEventListener('keydown', onEscapeClose)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEscapeClose)
  unlockBodyScroll()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-red-200/70 bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-red-50 shadow-lg backdrop-blur" :style="{ paddingTop: 'env(safe-area-inset-top)' }">
    <nav class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6">
      <NuxtLink to="/" class="flex min-w-0 items-center gap-2 md:gap-3" @click="closeMobileMenu">
        <img :src="logoUrl" alt="协会 Logo" class="h-9 w-9 rounded-full border border-yellow-300/50 bg-white/95 object-cover md:h-10 md:w-10" />
        <div class="min-w-0">
          <p class="truncate text-base font-extrabold tracking-wide md:text-lg">协会官网</p>
          <p class="truncate text-[11px] text-red-100/80 md:text-xs">红色国潮 · 凝心聚力</p>
        </div>
      </NuxtLink>

      <ul class="hidden items-center gap-1 text-sm font-medium md:flex md:gap-2 md:text-base">
        <li v-for="link in navLinks" :key="link.to"><NuxtLink :to="link.to" class="nav-link">{{ link.label }}</NuxtLink></li>
      </ul>

      <button
        type="button"
        class="flex h-11 min-w-11 items-center justify-center rounded-md text-red-50 transition hover:bg-red-700/60 md:hidden"
        aria-label="打开导航菜单"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav-drawer-panel"
        @click="toggleMobileMenu"
      >
        ☰
      </button>
    </nav>
  </header>

  <MobileNavDrawer panel-id="mobile-nav-drawer-panel" :open="mobileMenuOpen" :links="navLinks" @close="closeMobileMenu" />
</template>

<style scoped>
.nav-link {
  @apply rounded-md px-2 py-1 text-red-50/95 transition hover:bg-red-700/50 hover:text-yellow-200 md:px-3;
}
.nav-link.router-link-active {
  @apply bg-red-700/60 text-yellow-200;
}
</style>
