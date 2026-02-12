<script setup lang="ts">
import type { StrapiItem, Member } from '~/types/strapi'

defineProps<{
  member: StrapiItem<Member>
}>()
</script>

<template>
  <article class="group rounded-xl border border-red-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-700 to-red-900 text-lg font-bold text-yellow-200">
        {{ member.attributes.name.slice(0, 1) }}
      </div>
      <div>
        <h3 class="text-lg font-bold text-red-900">{{ member.attributes.name }}</h3>
        <p class="text-sm text-red-700/80">{{ member.attributes.title }}</p>
      </div>
    </div>
    <p class="text-sm leading-6 text-slate-700">{{ member.attributes.bio }}</p>
    <NuxtLink :to="`/members/${member.attributes.slug}`" class="mt-4 inline-block text-sm font-semibold text-red-700 hover:text-red-900">
      查看会员详情 →
    </NuxtLink>
  </article>
</template>
