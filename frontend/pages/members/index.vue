<script setup lang="ts">
import type { Member } from '~/types/strapi'

const search = ref('')
const currentTag = ref('全部')

useSeoMeta({
  title: '会员墙',
  description: '协会会员墙，展示会员单位与个人风采。'
})

const { getList } = useApi()
const { data } = await useAsyncData('members', async () => {
  const res = await getList<Member>('/members', {
    'sort[0]': 'wallOrder:asc',
    'sort[1]': 'createdAt:desc'
  })
  return res.data
})

const tags = computed(() => {
  const values = new Set((data.value || []).map((item) => item.attributes.tag).filter(Boolean))
  return ['全部', ...Array.from(values) as string[]]
})

const filteredMembers = computed(() => {
  return (data.value || []).filter((item) => {
    const attrs = item.attributes
    const keyword = search.value.trim().toLowerCase()
    const hitSearch = !keyword || [attrs.name, attrs.title, attrs.city, attrs.bio].some((field) => String(field || '').toLowerCase().includes(keyword))
    const hitTag = currentTag.value === '全部' || attrs.tag === currentTag.value
    return hitSearch && hitTag
  })
})
</script>

<template>
  <section class="space-y-5">
    <SectionTitle title="会员墙" desc="携手会员共进，共创发展新格局" />

    <div class="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
      <div class="grid gap-3 md:grid-cols-[2fr,3fr]">
        <input v-model="search" type="text" placeholder="搜索会员名称 / 城市 / 简介" class="rounded-lg border border-red-200 px-3 py-2 text-sm outline-none focus:border-red-500" />
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-semibold transition"
            :class="currentTag === tag ? 'border-red-700 bg-red-700 text-white' : 'border-red-200 text-red-700 hover:border-red-400'"
            @click="currentTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MemberCard v-for="member in filteredMembers" :key="member.id" :member="member" />
    </div>
  </section>
</template>
