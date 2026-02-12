<script setup lang="ts">
import type { Member } from '~/types/strapi'

const route = useRoute()
const slug = String(route.params.slug)
const { getList } = useApi()

const { data } = await useAsyncData(`member-${slug}`, async () => {
  const res = await getList<Member>('/members', {
    'filters[slug][$eq]': slug
  })
  return res.data[0]
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '会员不存在' })
}

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
      </div>
    </div>

    <p class="mt-6 whitespace-pre-wrap leading-8 text-slate-700">{{ data?.attributes.bio }}</p>

    <NuxtLink to="/members" class="mt-8 inline-block rounded-full border border-red-700 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white">
      返回会员墙
    </NuxtLink>
  </article>
</template>
