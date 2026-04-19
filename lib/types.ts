export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'web-development' | 'mobile-apps' | 'ai-tech' | 'business'
  date: string
  readTime: number
  author: string
  tags: string[]
  content: BlogContentBlock[]
  coverImage?: string
}

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'numbers'; items: string[] }
  | { type: 'tip'; label: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta'; heading: string; body: string; linkText: string; linkHref: string }
