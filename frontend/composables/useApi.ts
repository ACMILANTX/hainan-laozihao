import type { StrapiListResponse, StrapiSingleResponse } from '~/types/strapi'

export const useApi = () => {
  const config = useRuntimeConfig()

  const getList = async <T>(endpoint: string, params: Record<string, string> = {}) => {
    return await $fetch<StrapiListResponse<T>>(`${config.public.apiBase}${endpoint}`, { params })
  }

  const getSingle = async <T>(endpoint: string, params: Record<string, string> = {}) => {
    return await $fetch<StrapiSingleResponse<T>>(`${config.public.apiBase}${endpoint}`, { params })
  }

  const resolveStrapiUrl = (url?: string | null) => {
    if (!url) {
      return ''
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    const apiBase = String(config.public.apiBase || '/api')
    const origin = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase
    return `${origin}${url}`
  }

  return { getList, getSingle, resolveStrapiUrl }
}
