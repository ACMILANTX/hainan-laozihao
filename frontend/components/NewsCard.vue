<script setup lang="ts">
import type { News, StrapiItem } from '~/types/strapi'

defineProps<{
  item: StrapiItem<News>
}>()
</script>

<template>
  <article class="group rounded-xl border border-red-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <p class="text-xs font-medium tracking-wide text-red-600">
      {{ new Date(item.attributes.publishedAt).toLocaleDateString() }}
    </p>
    <h3 class="mt-2 text-lg font-bold text-red-900">{{ item.attributes.title }}</h3>
    <p class="mt-3 text-sm leading-6 text-slate-700">{{ item.attributes.summary }}</p>
    <NuxtLink :to="`/news/${item.attributes.slug}`" class="mt-4 inline-block text-sm font-semibold text-red-700 hover:text-red-900">
      阅读全文 →
    </NuxtLink>
  </article>
</template>
