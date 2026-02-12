<script setup lang="ts">
import type { News } from '~/types/strapi'

useSeoMeta({
  title: '协会新闻',
  description: '协会新闻卡片列表，聚合公告、活动和行业动态。'
})

const { getList } = useApi()
const { data } = await useAsyncData('news-list', async () => {
  const res = await getList<News>('/news', {
    'sort[0]': 'pinned:desc',
    'sort[1]': 'publishedAt:desc'
  })
  return res.data
})
</script>

<template>
  <section>
    <SectionTitle title="协会新闻" desc="及时掌握协会公告与活动动态" />
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <NewsCard v-for="item in data || []" :key="item.id" :item="item" />
    </div>
  </section>
</template>
