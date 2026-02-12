<script setup lang="ts">
await useSiteSettings()
</script>

<template>
  <div class="min-h-screen bg-[var(--theme-bg)] text-slate-800">
    <SiteHeader />
    <main class="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
