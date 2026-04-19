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
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#080808] transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] hover:-translate-y-1.5"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black" />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
        
        {/* Category badge */}
        <div className="absolute left-6 top-6">
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 pt-4">
        {/* Header/Date */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
          <span>{post.readTime} min read</span>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-emerald-400">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-4 text-[15px] leading-relaxed text-gray-400 line-clamp-2 font-medium">
          {post.excerpt}
        </p>

        {/* Footer/CTA */}
        <div className="mt-auto pt-8">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-emerald-500 group-hover:text-emerald-400">
            Read Article
            <div className="h-px w-8 bg-emerald-500/30 transition-all duration-300 group-hover:w-12 group-hover:bg-emerald-500" />
          </div>
        </div>
      </div>
    </Link>
  )
}
