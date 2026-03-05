<script setup lang="ts">
import type { Member, MemberCategory, News } from '~/types/strapi'

const site = await useSiteSettings()
const heroImage = useImageSource(site.value.heroImage, '/images/hero-poster.svg')
const memberCategories: Array<{ label: string, value: MemberCategory }> = [
  { label: '中华老字号', value: 'china_time_honored' },
  { label: '海南老字号', value: 'hainan_time_honored' },
  { label: '海南新字号', value: 'hainan_new_brand' },
  { label: '品牌培育库', value: 'brand_incubation_pool' }
]

useSeoMeta({
  title: '首页',
  description: '红色国潮风格协会官网，展示会员墙、协会视频与协会新闻。'
})

const { getList } = useApi()

const { data: memberGroupData } = await useAsyncData('home-members-grouped', async () => {
  const results = await Promise.all(memberCategories.map(async (category) => {
    const res = await getList<Member>('/members', {
      'sort[0]': 'wallOrder:asc',
      'sort[1]': 'createdAt:desc',
      'filters[brandLevel][$eq]': category.value,
      'pagination[pageSize]': '3'
    })

    return {
      category: category.label,
      items: res.data
    }
  }))

  return results
})

const { data: newsData } = await useAsyncData('home-news', async () => {
  const res = await getList<News>('/news', {
    'sort[0]': 'pinned:desc',
    'sort[1]': 'publishedAt:desc',
    'pagination[pageSize]': '6'
  })
  return res.data
})

const toEmbedUrl = (raw?: string) => {
  if (!raw) {
    return ''
  }

  if (raw.includes('bilibili.com/video/')) {
    const match = raw.match(/video\/(BV[\w]+)/)
    return match ? `https://player.bilibili.com/player.html?bvid=${match[1]}&page=1` : raw
  }

  if (raw.includes('youtube.com/watch') || raw.includes('youtu.be/')) {
    const idMatch = raw.match(/(?:v=|youtu\.be\/)([\w-]+)/)
    return idMatch?.[1] ? `https://www.youtube.com/embed/${idMatch[1]}` : raw
  }

  return raw
}

const homeVideos = computed(() => {
  return [
    {
      title: site.value.homeVideo1Title || '协会视频 1',
      url: toEmbedUrl(site.value.homeVideo1Url)
    },
    {
      title: site.value.homeVideo2Title || '协会视频 2',
      url: toEmbedUrl(site.value.homeVideo2Url)
    }
  ].filter((item) => item.url)
})
</script>

<template>
  <section class="space-y-10">
    <PosterHero :title="site.heroTitle" :subtitle="site.heroSubtitle" :image-url="heroImage" />

    <section>
      <SectionTitle title="会员墙" desc="四大板块展示：中华老字号、海南老字号、海南新字号、品牌培育库" />
      <div class="grid gap-5 lg:grid-cols-2">
        <div v-for="group in memberGroupData || []" :key="group.category" class="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
          <h3 class="text-base font-bold text-red-900">{{ group.category }}</h3>
          <div class="mt-3 space-y-3">
            <MemberCard v-for="member in group.items" :key="member.id" :member="member" />
            <p v-if="!group.items.length" class="rounded-lg bg-red-50 p-3 text-xs text-red-700">该板块暂未录入会员。</p>
          </div>
        </div>
      </div>
      <div class="mt-6 text-right">
        <NuxtLink to="/members" class="rounded-full px-5 py-2 text-sm font-semibold text-white transition" :style="{ backgroundColor: site.themePrimary }">查看全部会员</NuxtLink>
      </div>
    </section>

    <section>
      <SectionTitle title="协会视频" desc="" />
      <div class="grid gap-5 md:grid-cols-2">
        <article v-for="video in homeVideos" :key="video.title" class="overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm">
          <iframe :src="video.url" class="h-64 w-full" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen />
          <p class="p-3 text-sm font-semibold text-red-900">{{ video.title }}</p>
        </article>
      </div>
      <p v-if="!homeVideos.length" class="rounded-lg bg-red-50 p-4 text-sm text-red-700">请在后台 site 页面配置 homeVideo1Url、homeVideo2Url 后展示首页视频。</p>
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
