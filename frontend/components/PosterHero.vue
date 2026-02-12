<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  imageUrl?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden rounded-2xl border border-red-300/40 bg-gradient-to-br from-red-800 via-red-700 to-red-900 p-6 text-red-50 shadow-2xl md:p-10">
    <img v-if="imageUrl" :src="imageUrl" alt="协会海报" class="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div class="absolute inset-0 opacity-25" style="background-image: repeating-linear-gradient(135deg, #fca5a5 0, #fca5a5 2px, transparent 2px, transparent 14px);"></div>
    <div class="absolute -right-12 -top-12 h-48 w-48 rounded-full border-8 border-yellow-200/40"></div>
    <div class="absolute -bottom-16 -left-10 h-56 w-56 rounded-full border-8 border-yellow-200/30"></div>

    <div class="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
      <div>
        <p class="mb-3 inline-block rounded-full border border-yellow-200/50 bg-red-950/40 px-3 py-1 text-xs tracking-widest text-yellow-200">ASSOCIATION POSTER</p>
        <h1 class="text-3xl font-black leading-tight md:text-5xl">{{ title }}</h1>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-red-100 md:text-base">{{ subtitle }}</p>
      </div>
      <div class="rounded-xl border border-yellow-200/40 bg-red-950/40 p-4 text-sm text-red-100">
        <p class="text-yellow-200">愿景</p>
        <p class="mt-1">共建开放、专业、可信赖的行业生态。</p>
        <p class="mt-4 text-yellow-200">使命</p>
        <p class="mt-1">连接会员与社会，推动交流、协作与发展。</p>
      </div>
    </div>
  </section>
</template>
