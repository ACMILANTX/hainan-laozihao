<script setup lang="ts">
defineProps<{
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="mb-5 flex items-end justify-between gap-4">
    <div>
      <h2 class="text-2xl font-extrabold text-red-900 md:text-3xl">{{ title }}</h2>
      <p v-if="desc" class="mt-1 text-sm text-red-800/80">{{ desc }}</p>
    </div>
    <span class="hidden h-1 w-20 rounded bg-gradient-to-r from-red-700 to-yellow-500 md:block"></span>
  </div>
</template>
