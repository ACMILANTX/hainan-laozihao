<script setup lang="ts">
import type { News, StrapiItem } from '~/types/strapi'

const props = defineProps<{
  item: StrapiItem<News>
}>()

const cover = useImageSource(props.item.attributes.coverUrl, '/images/news-cover.svg')
</script>

<template>
  <article class="group overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <img :src="cover" alt="新闻配图" class="h-40 w-full object-cover" />
    <div class="p-5">
      <p class="text-xs font-medium tracking-wide text-red-600">
        {{ new Date(item.attributes.publishedAt).toLocaleDateString() }}
        <span v-if="item.attributes.pinned" class="ml-2 rounded-full bg-red-700 px-2 py-0.5 text-[10px] text-white">置顶</span>
      </p>
      <h3 class="mt-2 text-lg font-bold text-red-900">{{ item.attributes.title }}</h3>
      <p class="mt-3 text-sm leading-6 text-slate-700">{{ item.attributes.excerpt || item.attributes.summary }}</p>
      <NuxtLink :to="`/news/${item.attributes.slug}`" class="mt-4 inline-block text-sm font-semibold text-red-700 hover:text-red-900">
        阅读全文 →
      </NuxtLink>
    </div>
  </article>
</template>
