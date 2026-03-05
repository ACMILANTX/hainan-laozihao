<script setup lang="ts">
import type { News, NewsCategory } from '~/types/strapi'

const categories: Array<{ label: string, value: NewsCategory }> = [
  { label: '活动速递', value: 'event_updates' },
  { label: '政策汇编', value: 'policy_digest' },
  { label: '协会通知', value: 'association_notice' },
  { label: '老字号商场', value: 'time_honored_mall' }
]
const currentCategory = ref<NewsCategory>('event_updates')

useSeoMeta({
  title: '协会新闻',
  description: '协会新闻分为活动速递、政策汇编、协会通知、老字号商场四个板块。'
})

const { getList } = useApi()

const { data, pending } = await useAsyncData('news-list', async () => {
  const res = await getList<News>('/news', {
    'sort[0]': 'pinned:desc',
    'sort[1]': 'publishedAt:desc',
    'filters[category][$eq]': currentCategory.value,
    publicationState: 'live',
    populate: '*',
    'pagination[page]': 1,
    'pagination[pageSize]': 12
  })
  return res.data
}, {
  watch: [currentCategory]
})
</script>

<template>
  <section>
    <SectionTitle title="协会新闻" desc="活动速递、政策汇编、协会通知、老字号商场" />

    <div class="mb-5 flex flex-wrap gap-2 rounded-xl border border-red-100 bg-white p-3 shadow-sm">
      <button
        v-for="category in categories"
        :key="category.value"
        type="button"
        class="rounded-full border px-3 py-1 text-xs font-semibold transition"
        :class="currentCategory === category.value ? 'border-red-700 bg-red-700 text-white' : 'border-red-200 text-red-700 hover:border-red-400'"
        @click="currentCategory = category.value"
      >
        {{ category.label }}
      </button>
    </div>

    <p v-if="pending" class="text-sm text-slate-500">加载中...</p>
    <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <NewsCard v-for="item in data || []" :key="item.id" :item="item" />
    </div>

    <p v-if="!pending && !(data || []).length" class="rounded-lg bg-red-50 p-4 text-sm text-red-700">当前分类暂无内容。</p>
  </section>
</template>
