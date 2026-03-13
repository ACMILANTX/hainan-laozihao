<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import type { News, NewsCategory } from '~/types/strapi'

const route = useRoute()
const slug = String(route.params.slug)
const { getList } = useApi()

const categoryLabelMap: Record<NewsCategory, string> = {
  event_updates: '活动速递',
  policy_digest: '政策汇编',
  association_notice: '协会通知',
  time_honored_mall: '老字号商场'
}

const { data } = await useAsyncData(`news-${slug}`, async () => {
  const res = await getList<News>('/news', {
    'filters[slug][$eq]': slug,
    publicationState: 'live',
    populate: '*',
    'pagination[page]': 1,
    'pagination[pageSize]': 1
  })
  return res.data[0]
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
}

const cover = useImageSource(data.value.attributes.coverUrl, '/images/news-cover.svg')

const markdown = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true
})

const renderedContent = computed(() => {
  const source = data.value?.attributes.content || ''
  const html = markdown.render(source)

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title'],
      a: ['href', 'name', 'target', 'rel']
    },
    allowedSchemes: ['http', 'https', 'data'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' })
    }
  })
})

const iframeVideoUrl = computed(() => {
  const raw = data.value?.attributes.videoUrl
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
})

useSeoMeta({
  title: data.value.attributes.title,
  description: data.value.attributes.excerpt || data.value.attributes.summary || '协会新闻详情'
})
</script>

<template>
  <article class="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-10">
    <img :src="cover" alt="新闻封面" class="mb-4 h-64 w-full rounded-xl object-cover" />
    <div class="flex flex-wrap items-center gap-2 text-sm text-red-700">
      <span>{{ new Date(data?.attributes.publishedAt || '').toLocaleDateString() }}</span>
      <span v-if="data?.attributes.category" class="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold">{{ categoryLabelMap[data?.attributes.category] || data?.attributes.category }}</span>
    </div>
    <h1 class="mt-2 text-2xl font-extrabold text-red-900 md:text-3xl">{{ data?.attributes.title }}</h1>
    <p class="mt-4 rounded-lg bg-red-50 p-4 text-sm leading-7 text-red-900/90">{{ data?.attributes.excerpt || data?.attributes.summary }}</p>

    <section v-if="iframeVideoUrl" class="mt-6">
      <h2 class="text-lg font-bold text-red-900">活动视频</h2>
      <div class="mt-3 overflow-hidden rounded-xl border border-red-100">
        <iframe
          :src="iframeVideoUrl"
          class="h-72 w-full md:h-96"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>

    <div class="prose prose-slate mt-6 max-w-none leading-8 text-slate-700" v-html="renderedContent" />

    <NuxtLink to="/news" class="mt-8 inline-block rounded-full border border-red-700 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white">
      返回新闻列表
    </NuxtLink>
  </article>
</template>
