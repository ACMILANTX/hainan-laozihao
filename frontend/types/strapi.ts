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

export interface Member {
  name: string
  title: string
  bio: string
  avatarUrl?: string
  slug: string
  createdAt: string
}

export interface News {
  title: string
  summary: string
  content: string
  slug: string
  publishedAt: string
  coverUrl?: string
  createdAt: string
}

export interface SitePage {
  title: string
  slug: string
  content: string
  seoTitle?: string
  seoDescription?: string
}
