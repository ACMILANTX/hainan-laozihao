<script setup lang="ts">
import type { Member, MemberCategory, StrapiItem } from '~/types/strapi'

const search = ref('')
const currentCategory = ref<MemberCategory>('china_time_honored')
const categories: Array<{ label: string, value: MemberCategory }> = [
  { label: '中华老字号', value: 'china_time_honored' },
  { label: '海南老字号', value: 'hainan_time_honored' },
  { label: '海南新字号', value: 'hainan_new_brand' },
  { label: '品牌培育库', value: 'brand_incubation_pool' }
]
const page = ref(1)
const pageSize = 24
const members = ref<Array<StrapiItem<Member>>>([])
const total = ref(0)
const pageCount = ref(1)
const isLoading = ref(false)

useSeoMeta({
  title: '会员墙',
  description: '协会会员墙，按中华老字号、海南老字号、海南新字号、品牌培育库四大板块展示。'
})

const { getList } = useApi()

const loadMembers = async (targetPage = 1) => {
  if (isLoading.value || targetPage < 1) {
    return
  }

  isLoading.value = true

  try {
    const res = await getList<Member>('/members', {
      'sort[0]': 'wallOrder:asc',
      'sort[1]': 'createdAt:desc',
      'filters[brandLevel][$eq]': currentCategory.value,
      publicationState: 'live',
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

await useAsyncData('members-by-category', async () => {
  await loadMembers(1)
  return true
})

watch(currentCategory, async () => {
  await loadMembers(1)
})

const filteredMembers = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  return (members.value || []).filter((item) => {
    if (!keyword) {
      return true
    }

    const attrs = item.attributes
    return [attrs.name, attrs.title, attrs.city, attrs.bio, attrs.brandStory, attrs.province]
      .some((field) => String(field || '').toLowerCase().includes(keyword))
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
    <SectionTitle title="会员墙" desc="四大板块：中华老字号、海南老字号、海南新字号、品牌培育库" />

    <div class="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
      <div class="grid gap-3 md:grid-cols-[2fr,3fr]">
        <input v-model="search" type="text" placeholder="搜索会员名称 / 城市 / 简介" class="rounded-lg border border-red-200 px-3 py-2 text-sm outline-none focus:border-red-500" />
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category.value"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-semibold transition"
            :class="currentCategory === category.value ? 'border-red-700 bg-red-700 text-white' : 'border-red-200 text-red-700 hover:border-red-400'"
            @click="currentCategory = category.value"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </div>

    <p class="text-sm text-slate-600">{{ categories.find((item) => item.value === currentCategory)?.label }}：共 {{ total }} 位会员（每页 {{ pageSize }} 条）</p>

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
