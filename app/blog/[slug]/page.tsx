import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate, categoryLabels, categoryColors } from '@/lib/blog'
import type { BlogContentBlock } from '@/lib/types'
import ContentRenderer from '@/components/ContentRenderer'
import BlogCard from '@/components/BlogCard'
import TableOfContents from '@/components/TableOfContents'

// ─── Static generation ───────────────────────────────────────────────────────
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// ─── Per-post metadata ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Point of Dev`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | Point of Dev`,
      description: post.excerpt,
      url: `https://pointofdev.com/blog/${post.slug}`,
      siteName: 'Point of Dev',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

// ─── Extract TOC items from content blocks ────────────────────────────────────
function extractTocItems(content: BlogContentBlock[]) {
  return content
    .filter((b): b is Extract<BlogContentBlock, { type: 'h2' }> => b.type === 'h2')
    .map((b) => ({ id: b.id, text: b.text }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const tocItems = extractTocItems(post.content)
  const relatedPosts = getRelatedPosts(post.slug, post.category)

  return (
    <main className="min-h-screen bg-black uppercase-none">
      {/* ─── Back link ─────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5 px-6 py-6 bg-black">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-emerald-400"
          >
            <div className="h-px w-6 bg-gray-500 transition-all group-hover:bg-emerald-400" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/5 px-6 py-20 bg-black relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[300px] w-full -translate-x-1/2 opacity-10 blur-[100px] bg-emerald-500 rounded-full" />
        
        <div className="mx-auto max-w-3xl text-center">
          {/* Category badge */}
          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>

          {/* Title */}
          <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <span className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400">
                P
              </div>
              {post.author}
            </span>
            <div className="h-1 w-1 rounded-full bg-emerald-500/30" />
            <span>{formatDate(post.date)}</span>
            <div className="h-1 w-1 rounded-full bg-emerald-500/30" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* ─── Content + Sidebar ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex gap-14">
          {/* Article */}
          <article className="min-w-0 flex-1 max-w-3xl">
            <ContentRenderer blocks={post.content} />
          </article>

          {/* Sticky TOC sidebar — hidden on mobile */}
          {tocItems.length > 0 && (
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-8 rounded-xl border border-[#1e1e2e] bg-[#111118] p-5">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ─── Tags ──────────────────────────────────────────────────────────── */}
      {post.tags.length > 0 && (
        <section className="border-t border-[#1e1e2e] px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#1e1e2e] bg-[#111118] px-3 py-1 text-xs text-[#94a3b8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Related posts ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#1e1e2e] px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-bold text-[#f1f5f9]">Related articles</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
