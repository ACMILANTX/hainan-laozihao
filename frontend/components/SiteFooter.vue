<script setup lang="ts">
const site = await useSiteSettings()
</script>

<template>
  <footer class="relative mt-16 overflow-hidden border-t border-red-300/40 bg-gradient-to-b from-red-900 to-red-950 text-red-50">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,221,0,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,120,80,0.14),transparent_40%)]" />
    <div class="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
      <section>
        <h3 class="text-xl font-bold text-yellow-200">海南省老字号企业协会</h3>
        <p class="mt-3 text-sm leading-6 text-red-100/90">传承国潮精神，汇聚会员力量，打造交流共享的行业平台。</p>
      </section>
      <section>
        <h4 class="font-semibold text-yellow-100">快速导航</h4>
        <ul class="mt-3 space-y-2 text-sm text-red-100/90">
          <li><NuxtLink to="/members" class="hover:text-yellow-200">会员墙</NuxtLink></li>
          <li><NuxtLink to="/news" class="hover:text-yellow-200">协会新闻</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-yellow-200">关于协会</NuxtLink></li>
        </ul>
      </section>
      <section>
        <h4 class="font-semibold text-yellow-100">联系信息</h4>
        <ul class="mt-3 space-y-2 text-sm text-red-100/90">
          <li>邮箱：765258653@qq.com</li>
          <li>电话：13198979988</li>
          <li>地址：海南品牌出海孵化基地:海南省海口市龙华区新华北路2号中国工商银行解放路支行三楼</li>
        </ul>
      </section>
    </div>
    <div class="relative border-t border-red-400/20 px-4 py-4 text-center text-xs text-red-100/80">
      {{ site.footerText }}
    </div>
  </footer>
</template>
