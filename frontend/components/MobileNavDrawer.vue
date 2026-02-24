<script setup lang="ts">
defineProps<{
  open: boolean
  links: Array<{ to: string; label: string }>
  panelId?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const onMaskClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const closeDrawer = () => emit('close')
</script>

<template>
  <Teleport to="body">
    <Transition name="mobile-drawer-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[60] bg-slate-950/50"
        role="dialog"
        aria-modal="true"
        aria-label="移动端导航菜单"
        @click="onMaskClick"
      >
        <Transition name="mobile-drawer-slide">
          <aside
            v-if="open"
            :id="panelId"
            class="mobile-drawer-panel ml-auto flex h-full w-full max-w-[320px] flex-col bg-white shadow-2xl"
          >
            <div class="flex min-h-14 items-center justify-between border-b border-slate-200 px-4" :style="{ paddingTop: 'env(safe-area-inset-top)' }">
              <p class="text-base font-semibold text-slate-800">菜单</p>
              <button
                type="button"
                class="flex h-11 min-w-11 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100"
                aria-label="关闭导航菜单"
                @click="closeDrawer"
              >
                ✕
              </button>
            </div>

            <nav class="flex-1 overflow-y-auto px-3 py-3">
              <ul class="space-y-1">
                <li v-for="link in links" :key="link.to">
                  <NuxtLink
                    :to="link.to"
                    class="mobile-nav-link"
                    @click="closeDrawer"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-nav-link {
  @apply flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-800;
}
.mobile-nav-link.router-link-active {
  @apply bg-red-50 text-red-800;
}
.mobile-drawer-fade-enter-active,
.mobile-drawer-fade-leave-active {
  transition: opacity 0.2s ease;
}
.mobile-drawer-fade-enter-from,
.mobile-drawer-fade-leave-to {
  opacity: 0;
}
.mobile-drawer-slide-enter-active,
.mobile-drawer-slide-leave-active {
  transition: transform 0.25s ease;
}
.mobile-drawer-slide-enter-from,
.mobile-drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
