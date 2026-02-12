<script setup lang="ts">
import type { StrapiItem, Member } from '~/types/strapi'

defineProps<{
  member: StrapiItem<Member>
}>()
</script>

<template>
  <article class="group rounded-xl border border-red-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div class="mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-700 to-red-900 text-lg font-bold text-yellow-200">
          {{ member.attributes.name.slice(0, 1) }}
        </div>
        <div>
          <h3 class="text-lg font-bold text-red-900">{{ member.attributes.name }}</h3>
          <p class="text-sm text-red-700/80">{{ member.attributes.title }}</p>
        </div>
      </div>
      <span
        v-if="member.attributes.tag"
        class="rounded-full px-3 py-1 text-xs font-semibold text-white"
        :style="{ backgroundColor: member.attributes.tagColor || '#b91c1c' }"
      >
        {{ member.attributes.tag }}
      </span>
    </div>
    <p v-if="member.attributes.city" class="text-xs text-red-700">{{ member.attributes.city }}</p>
    <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">{{ member.attributes.bio }}</p>
    <p v-if="member.attributes.brandStory" class="mt-2 line-clamp-2 text-xs text-slate-500">品牌故事：{{ member.attributes.brandStory }}</p>
    <NuxtLink :to="`/members/${member.attributes.slug}`" class="mt-4 inline-block text-sm font-semibold text-red-700 hover:text-red-900">
      查看会员详情 →
    </NuxtLink>
  </article>
</template>
