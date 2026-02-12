export const useImageSource = (primary?: string, fallback = '/images/placeholder.svg') => {
  const { resolveStrapiUrl } = useApi()
  return computed(() => resolveStrapiUrl(primary) || fallback)
}
