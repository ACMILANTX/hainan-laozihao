<script setup lang="ts">
import type { SitePage } from '~/types/strapi'

const { getList } = useApi()
const { data } = await useAsyncData('page-contact', async () => {
  const res = await getList<SitePage>('/pages', { 'filters[slug][$eq]': 'contact' })
  return res.data[0]
})

useSeoMeta({
  title: data.value?.attributes.seoTitle || '联系我们',
  description: data.value?.attributes.seoDescription || '协会联系信息页面。'
})
</script>

<template>
  <section class="space-y-6">
    <PosterHero
      title="联系我们"
      subtitle="欢迎咨询协会合作、活动参与与会员服务，我们期待与您携手发展。"
    />

    <article class="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-8">
      <h1 class="text-2xl font-extrabold text-red-900">{{ data?.attributes.title || '联系我们' }}</h1>
      <p class="mt-5 whitespace-pre-wrap leading-8 text-slate-700">{{ data?.attributes.content || '请在后台页面管理中维护 contact 页面内容。' }}</p>
    </article>
  </section>
</template>
