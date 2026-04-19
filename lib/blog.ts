import { blogs } from '@/data/blogs'
import type { BlogPost } from './types'

export type { BlogPost }

export function getAllPosts(): BlogPost[] {
  return [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, category: BlogPost['category'], count = 2): BlogPost[] {
  return blogs
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, count)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const categoryLabels: Record<BlogPost['category'], string> = {
  'web-development': 'Web Development',
  'mobile-apps': 'Mobile Apps',
  'ai-tech': 'AI & Tech',
  business: 'Business',
}

export const categoryColors: Record<BlogPost['category'], string> = {
  'web-development': 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  'mobile-apps': 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  'ai-tech': 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  business: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
}
