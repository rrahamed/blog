import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/types'
import { formatDate, categoryLabels, categoryColors } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1e1e2e]/50 bg-[#111118]/80 backdrop-blur-md transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:-translate-y-1.5"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50" />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-60" />
        
        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Header/Date */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-indigo-500/50" />
          <span>{post.readTime} min read</span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-bold leading-tight text-white transition-colors group-hover:text-indigo-300">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-[#94a3b8] line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer/CTA */}
        <div className="mt-auto pt-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 group-hover:text-indigo-300">
            Read Article
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
