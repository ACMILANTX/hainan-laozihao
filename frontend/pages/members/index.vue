<script setup lang="ts">
import type { Member, StrapiItem } from '~/types/strapi'

const search = ref('')
const currentTag = ref('全部')
const page = ref(1)
const pageSize = 25
const members = ref<Array<StrapiItem<Member>>>([])
const total = ref(0)
const pageCount = ref(1)
const isLoading = ref(false)

useSeoMeta({
  title: '会员墙',
  description: '协会会员墙，展示会员单位与个人风采。'
})

const { getList } = useApi()

const loadMembers = async (targetPage: number) => {
  if (isLoading.value || targetPage < 1) {
    return
  }

  isLoading.value = true

  try {
    const res = await getList<Member>('/members', {
      'sort[0]': 'wallOrder:asc',
      'sort[1]': 'createdAt:desc',
      'publicationState': 'live',
      'pagination[page]': targetPage,
      'pagination[pageSize]': pageSize
    })

    members.value = res.data
    total.value = res.meta.pagination?.total || 0
    pageCount.value = res.meta.pagination?.pageCount || 1
    page.value = res.meta.pagination?.page || targetPage
  } finally {
    isLoading.value = false
  }
}

await useAsyncData('members', async () => {
  await loadMembers(page.value)
  return true
})

watch([search, currentTag], () => {
  if (page.value !== 1) {
    loadMembers(1)
  }
})

const tags = computed(() => {
  const values = new Set((members.value || []).map((item) => item.attributes.tag).filter(Boolean))
  return ['全部', ...Array.from(values) as string[]]
})

const filteredMembers = computed(() => {
  return (members.value || []).filter((item) => {
    const attrs = item.attributes
    const keyword = search.value.trim().toLowerCase()
    const hitSearch = !keyword || [attrs.name, attrs.title, attrs.city, attrs.bio].some((field) => String(field || '').toLowerCase().includes(keyword))
    const hitTag = currentTag.value === '全部' || attrs.tag === currentTag.value
    return hitSearch && hitTag
  })
})

const visiblePageNumbers = computed(() => {
  const current = page.value
  const totalPages = pageCount.value

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages, current - 1, current, current + 1])
  return Array.from(pages).filter((num) => num >= 1 && num <= totalPages).sort((a, b) => a - b)
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

    <p class="text-sm text-slate-600">共 {{ total }} 位会员（每页 {{ pageSize }} 条）</p>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MemberCard v-for="member in filteredMembers" :key="member.id" :member="member" />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
      <button
        type="button"
        class="rounded-full border border-red-200 px-3 py-1 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="isLoading || page <= 1"
        @click="loadMembers(page - 1)"
      >
        上一页
      </button>

      <button
        v-for="num in visiblePageNumbers"
        :key="num"
        type="button"
        class="rounded-full border px-3 py-1 text-sm font-semibold"
        :class="num === page ? 'border-red-700 bg-red-700 text-white' : 'border-red-200 text-red-700'"
        :disabled="isLoading"
        @click="loadMembers(num)"
      >
        {{ num }}
      </button>

      <button
        type="button"
        class="rounded-full border border-red-200 px-3 py-1 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="isLoading || page >= pageCount"
        @click="loadMembers(page + 1)"
      >
        下一页
      </button>
    </div>
  </section>
</template>
