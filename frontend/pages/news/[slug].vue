<script setup lang="ts">
import type { News } from '~/types/strapi'

const route = useRoute()
const slug = String(route.params.slug)
const { getList } = useApi()

const { data } = await useAsyncData(`news-${slug}`, async () => {
  const res = await getList<News>('/news', {
    'filters[slug][$eq]': slug
  })
  return res.data[0]
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
}

const cover = useImageSource(data.value.attributes.coverUrl, '/images/news-cover.svg')

useSeoMeta({
  title: data.value.attributes.title,
  description: data.value.attributes.excerpt || data.value.attributes.summary || '协会新闻详情'
})
</script>

<template>
  <article class="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-10">
    <img :src="cover" alt="新闻封面" class="mb-4 h-64 w-full rounded-xl object-cover" />
    <p class="text-sm font-medium text-red-700">{{ new Date(data?.attributes.publishedAt || '').toLocaleDateString() }}</p>
    <h1 class="mt-2 text-2xl font-extrabold text-red-900 md:text-3xl">{{ data?.attributes.title }}</h1>
    <p class="mt-4 rounded-lg bg-red-50 p-4 text-sm leading-7 text-red-900/90">{{ data?.attributes.excerpt || data?.attributes.summary }}</p>
    <div class="prose prose-slate mt-6 max-w-none whitespace-pre-wrap leading-8 text-slate-700">
      {{ data?.attributes.content }}
    </div>

    <NuxtLink to="/news" class="mt-8 inline-block rounded-full border border-red-700 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white">
      返回新闻列表
    </NuxtLink>
  </article>
</template>
