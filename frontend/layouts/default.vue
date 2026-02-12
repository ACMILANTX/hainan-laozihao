<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#fff1f2_30%,#fef2f2_100%)] text-slate-800">
    <SiteHeader />
    <main class="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
