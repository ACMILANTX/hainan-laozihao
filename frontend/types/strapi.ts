export interface StrapiItem<T> {
  id: number
  attributes: T
}

export interface StrapiListResponse<T> {
  data: Array<StrapiItem<T>>
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
    [key: string]: unknown
  }
}

export interface StrapiSingleResponse<T> {
  data: StrapiItem<T>
  meta: Record<string, unknown>
}

export interface StrapiMediaFile {
  id: number
  attributes: {
    url: string
    alternativeText?: string
  }
}

export interface StrapiMedia {
  data?: StrapiMediaFile | null
}

export interface StrapiMediaList {
  data?: StrapiMediaFile[]
}

export type MemberCategory = '中华老字号' | '海南老字号' | '海南新字号' | '品牌培育库'
export type NewsCategory = '活动速递' | '政策汇编' | '协会通知' | '老字号商场'

export interface Member {
  name: string
  title: string
  bio: string
  avatarUrl?: string
  slug: string
  brandStory?: string
  city?: string
  province?: string
  tag?: string
  tagColor?: string
  wallOrder?: number
  brandLevel?: MemberCategory
  productIntro?: string
  productImages?: StrapiMediaList
  officialWebsite?: string
  officialWebsiteLabel?: string
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
  category?: NewsCategory
  videoUrl?: string
  videoCover?: StrapiMedia
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
  homeVideo1Title?: string
  homeVideo1Url?: string
  homeVideo2Title?: string
  homeVideo2Url?: string
}
