import type { SitePage } from '~/types/strapi'

const defaultSettings = {
  heroTitle: '凝聚会员力量 · 共绘协会新篇',
  heroSubtitle: '以红色国潮视觉传递文化底蕴，打造兼具现代感与组织感的协会门户。',
  themePrimary: '#9f1239',
  themeBg: '#fff1f2',
  footerText: '© 协会官网 · 红色国潮主题'
}

export const useSiteSettings = async () => {
  const { getList, resolveStrapiUrl } = useApi()

  const { data } = await useAsyncData('site-settings', async () => {
    const res = await getList<SitePage>('/pages', {
      'filters[slug][$eq]': 'site',
      populate: 'heroImage,siteLogo'
    })
    return res.data[0]
  })

  const settings = computed(() => {
    const attrs = data.value?.attributes
    const heroImage = resolveStrapiUrl(attrs?.heroImage?.data?.attributes?.url)
    const logoImage = resolveStrapiUrl(attrs?.siteLogo?.data?.attributes?.url)

    return {
      heroTitle: attrs?.heroTitle || defaultSettings.heroTitle,
      heroSubtitle: attrs?.heroSubtitle || defaultSettings.heroSubtitle,
      themePrimary: attrs?.themePrimary || defaultSettings.themePrimary,
      themeBg: attrs?.themeBg || defaultSettings.themeBg,
      footerText: attrs?.footerText || defaultSettings.footerText,
      heroImage,
      siteLogo: logoImage
    }
  })

  if (process.client) {
    watchEffect(() => {
      const root = document.documentElement
      root.style.setProperty('--theme-primary', settings.value.themePrimary)
      root.style.setProperty('--theme-bg', settings.value.themeBg)
    })
  }

  return settings
}
