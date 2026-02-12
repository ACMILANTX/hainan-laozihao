import type { StrapiListResponse, StrapiSingleResponse } from '~/types/strapi'

export const useApi = () => {
  const config = useRuntimeConfig()

  const getList = async <T>(endpoint: string, params: Record<string, string> = {}) => {
    return await $fetch<StrapiListResponse<T>>(`${config.public.apiBase}${endpoint}`, { params })
  }

  const getSingle = async <T>(endpoint: string, params: Record<string, string> = {}) => {
    return await $fetch<StrapiSingleResponse<T>>(`${config.public.apiBase}${endpoint}`, { params })
  }

  return { getList, getSingle }
}
