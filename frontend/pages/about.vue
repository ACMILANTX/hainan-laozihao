<script setup lang="ts">
import type { SitePage } from '~/types/strapi'

const { getList } = useApi()
const { data } = await useAsyncData('page-about', async () => {
  const res = await getList<SitePage>('/pages', { 'filters[slug][$eq]': 'about' })
  return res.data[0]
})

useSeoMeta({
  title: data.value?.attributes.seoTitle || '关于协会',
  description: data.value?.attributes.seoDescription || '协会介绍页面。'
})
</script>

<template>
  <section class="space-y-6">
    <PosterHero
      title="关于协会"
      subtitle="我们致力于服务会员、推动交流合作，凝聚行业力量，传播专业价值。"
    />

    <article class="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-8">
      <h1 class="text-2xl font-extrabold text-red-900">{{ data?.attributes.title || '关于协会' }}</h1>
      <p class="mt-5 whitespace-pre-wrap leading-8 text-slate-700">{{ data?.attributes.content || '请在后台页面管理中维护 about 页面内容。' }}</p>
    </article>
  </section>
</template>
