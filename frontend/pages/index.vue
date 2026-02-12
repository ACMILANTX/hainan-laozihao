<script setup lang="ts">
import type { Member, News } from '~/types/strapi'

useSeoMeta({
  title: '首页',
  description: '红色国潮风格协会官网，展示会员墙与协会新闻。'
})

const { getList } = useApi()

const { data: memberData } = await useAsyncData('home-members', async () => {
  const res = await getList<Member>('/members', {
    'sort[0]': 'createdAt:desc',
    'pagination[pageSize]': '6'
  })
  return res.data
})

const { data: newsData } = await useAsyncData('home-news', async () => {
  const res = await getList<News>('/news', {
    'sort[0]': 'publishedAt:desc',
    'pagination[pageSize]': '6'
  })
  return res.data
})
</script>

<template>
  <section class="space-y-10">
    <PosterHero
      title="凝聚会员力量 · 共绘协会新篇"
      subtitle="以红色国潮视觉传递文化底蕴，打造兼具现代感与组织感的协会门户。这里汇聚会员风采、新闻动态与协会服务，展示专业、开放、协作的形象。"
    />

    <section>
      <SectionTitle title="会员墙" desc="优秀会员展示 · 共建协会生态" />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <MemberCard v-for="member in memberData || []" :key="member.id" :member="member" />
      </div>
      <div class="mt-6 text-right">
        <NuxtLink to="/members" class="rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-800">查看全部会员</NuxtLink>
      </div>
    </section>

    <section>
      <SectionTitle title="协会新闻" desc="最新公告 · 活动资讯 · 行业声音" />
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard v-for="item in newsData || []" :key="item.id" :item="item" />
      </div>
      <div class="mt-6 text-right">
        <NuxtLink to="/news" class="rounded-full border border-red-700 px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-700 hover:text-white">查看全部新闻</NuxtLink>
      </div>
    </section>
  </section>
</template>
