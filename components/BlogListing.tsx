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
            className={`rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border backdrop-blur-md ${
              active === f.value
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-105'
                : 'bg-white/5 text-gray-400 border-white/5 hover:border-emerald-500/30 hover:text-white hover:bg-emerald-500/5'
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
