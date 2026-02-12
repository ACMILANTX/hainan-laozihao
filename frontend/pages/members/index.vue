<script setup lang="ts">
import type { Member } from '~/types/strapi'

useSeoMeta({
  title: '会员墙',
  description: '协会会员墙，展示会员单位与个人风采。'
})

const { getList } = useApi()
const { data } = await useAsyncData('members', async () => {
  const res = await getList<Member>('/members', {
    'sort[0]': 'createdAt:desc'
  })
  return res.data
})
</script>

<template>
  <section>
    <SectionTitle title="会员墙" desc="携手会员共进，共创发展新格局" />
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MemberCard v-for="member in data || []" :key="member.id" :member="member" />
    </div>
  </section>
</template>
