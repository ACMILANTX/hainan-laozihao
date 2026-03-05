<script setup lang="ts">
import type { Member } from '~/types/strapi'

const route = useRoute()
const slug = String(route.params.slug)
const { getList, resolveStrapiUrl } = useApi()

const { data } = await useAsyncData(`member-${slug}`, async () => {
  const res = await getList<Member>('/members', {
    'filters[slug][$eq]': slug,
    populate: 'productImages'
  })
  return res.data[0]
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '会员不存在' })
}

const productImages = computed(() => {
  return (data.value?.attributes.productImages?.data || []).map((item) => ({
    id: item.id,
    alt: item.attributes.alternativeText || `${data.value?.attributes.name} 产品图`,
    src: resolveStrapiUrl(item.attributes.url)
  })).filter((item) => item.src)
})

const websiteLabel = computed(() => data.value?.attributes.officialWebsiteLabel || '访问会员官网')

useSeoMeta({
  title: `${data.value.attributes.name} - 会员详情`,
  description: data.value.attributes.bio?.slice(0, 120) || '协会会员详情'
})
</script>

<template>
  <article class="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-10">
    <div class="flex flex-wrap items-center gap-4 border-b border-red-100 pb-5">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-700 to-red-900 text-2xl font-black text-yellow-200">
        {{ data?.attributes.name.slice(0, 1) }}
      </div>
      <div>
        <h1 class="text-2xl font-extrabold text-red-900 md:text-3xl">{{ data?.attributes.name }}</h1>
        <p class="mt-1 text-red-700/80">{{ data?.attributes.title }}</p>
        <p v-if="data?.attributes.city" class="mt-1 text-xs text-red-700">{{ data?.attributes.city }}</p>
      </div>
      <span
        v-if="data?.attributes.tag"
        class="ml-auto rounded-full px-3 py-1 text-xs font-semibold text-white"
        :style="{ backgroundColor: data?.attributes.tagColor || '#b91c1c' }"
      >
        {{ data?.attributes.tag }}
      </span>
    </div>

    <p class="mt-6 whitespace-pre-wrap leading-8 text-slate-700">{{ data?.attributes.bio }}</p>
    <p v-if="data?.attributes.brandStory" class="mt-4 rounded-lg bg-red-50 p-4 text-sm leading-7 text-red-900/90">{{ data?.attributes.brandStory }}</p>

    <section
      v-if="data?.attributes.productIntro || productImages.length || data?.attributes.officialWebsite"
      class="mt-8 rounded-xl border border-red-100 bg-rose-50/40 p-5"
    >
      <h2 class="text-lg font-bold text-red-900">会员产品介绍</h2>
      <p v-if="data?.attributes.productIntro" class="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {{ data?.attributes.productIntro }}
      </p>

      <div v-if="productImages.length" class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <img
          v-for="image in productImages"
          :key="image.id"
          :src="image.src"
          :alt="image.alt"
          class="h-40 w-full rounded-lg border border-red-100 object-cover"
        />
      </div>

      <a
        v-if="data?.attributes.officialWebsite"
        :href="data?.attributes.officialWebsite"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-block rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
      >
        {{ websiteLabel }}
      </a>
    </section>

    <NuxtLink to="/members" class="mt-8 inline-block rounded-full border border-red-700 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white">
      返回会员墙
    </NuxtLink>
  </article>
</template>
