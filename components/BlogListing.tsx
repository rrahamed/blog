'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/lib/types'

type CategoryFilter = 'all' | BlogPost['category']

const filters: { label: string; value: CategoryFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web Development', value: 'web-development' },
  { label: 'Mobile Apps', value: 'mobile-apps' },
  { label: 'AI & Tech', value: 'ai-tech' },
  { label: 'Business', value: 'business' },
]

interface BlogListingProps {
  posts: BlogPost[]
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [active, setActive] = useState<CategoryFilter>('all')

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      {/* Category filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] mr-2">Filter by:</span>
        {filters.map((f) => (
          <button
            key={f.value}
            id={`filter-${f.value}`}
            onClick={() => setActive(f.value)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm ${
              active === f.value
                ? 'bg-indigo-600/20 text-white border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105'
                : 'bg-[#111118]/50 text-[#94a3b8] border-[#1e1e2e]/50 hover:border-indigo-500/40 hover:text-white hover:bg-indigo-500/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
        {filtered.length > 0 ? (
          filtered.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className="col-span-full text-center text-[#94a3b8] py-16">
            No posts in this category yet.
          </p>
        )}
      </div>
    </>
  )
}

// Re-export for use in server component
export { getAllPosts }
