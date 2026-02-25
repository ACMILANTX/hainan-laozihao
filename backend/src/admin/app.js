const DEFAULT_ADMIN_LOCALE = 'zh-Hans'
const ADMIN_LANGUAGE_STORAGE_KEY = 'strapi-admin-language'

export default {
  config: {
    locales: ['zh-Hans', 'en']
  },
  bootstrap() {
    const existingLocale = window.localStorage.getItem(ADMIN_LANGUAGE_STORAGE_KEY)

    if (!existingLocale) {
      window.localStorage.setItem(ADMIN_LANGUAGE_STORAGE_KEY, DEFAULT_ADMIN_LOCALE)
    }
  }
}
