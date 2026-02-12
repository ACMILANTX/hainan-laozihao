export interface StrapiItem<T> {
  id: number
  attributes: T
}

export interface StrapiListResponse<T> {
  data: Array<StrapiItem<T>>
  meta: Record<string, unknown>
}

export interface StrapiSingleResponse<T> {
  data: StrapiItem<T>
  meta: Record<string, unknown>
}

export interface StrapiMedia {
  data?: {
    id: number
    attributes: {
      url: string
      alternativeText?: string
    }
  } | null
}

export interface Member {
  name: string
  title: string
  bio: string
  avatarUrl?: string
  slug: string
  brandStory?: string
  city?: string
  tag?: string
  tagColor?: string
  wallOrder?: number
  createdAt: string
}

export interface News {
  title: string
  summary?: string
  excerpt?: string
  content: string
  slug: string
  publishedAt: string
  coverUrl?: string
  pinned?: boolean
  createdAt: string
}

export interface SitePage {
  title: string
  slug: string
  content: string
  seoTitle?: string
  seoDescription?: string
  themePrimary?: string
  themeBg?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: StrapiMedia
  siteLogo?: StrapiMedia
  footerText?: string
}
