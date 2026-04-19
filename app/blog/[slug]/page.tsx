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
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* ─── Back link ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#1e1e2e] px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#94a3b8] transition-colors hover:text-indigo-400"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#1e1e2e] px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          {/* Category badge */}
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>

          {/* Title */}
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#f1f5f9] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-indigo-600/40 border border-indigo-500/40 inline-flex items-center justify-center text-[10px] font-bold text-indigo-300">
                P
              </span>
              {post.author}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#94a3b8]" />
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-[#94a3b8]" />
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
