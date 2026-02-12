<script setup lang="ts">
import type { Member, News } from '~/types/strapi'

const site = await useSiteSettings()
const heroImage = useImageSource(site.value.heroImage, '/images/hero-poster.svg')

useSeoMeta({
  title: '首页',
  description: '红色国潮风格协会官网，展示会员墙与协会新闻。'
})

const { getList } = useApi()

const { data: memberData } = await useAsyncData('home-members', async () => {
  const res = await getList<Member>('/members', {
    'sort[0]': 'wallOrder:asc',
    'sort[1]': 'createdAt:desc',
    'pagination[pageSize]': '6'
  })
  return res.data
})

const { data: newsData } = await useAsyncData('home-news', async () => {
  const res = await getList<News>('/news', {
    'sort[0]': 'pinned:desc',
    'sort[1]': 'publishedAt:desc',
    'pagination[pageSize]': '6'
  })
  return res.data
})
</script>

<template>
  <section class="space-y-10">
    <PosterHero :title="site.heroTitle" :subtitle="site.heroSubtitle" :image-url="heroImage" />

    <section>
      <SectionTitle title="会员墙" desc="优秀会员展示 · 共建协会生态" />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <MemberCard v-for="member in memberData || []" :key="member.id" :member="member" />
      </div>
      <div class="mt-6 text-right">
        <NuxtLink to="/members" class="rounded-full px-5 py-2 text-sm font-semibold text-white transition" :style="{ backgroundColor: site.themePrimary }">查看全部会员</NuxtLink>
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
