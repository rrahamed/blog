import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogListing from '@/components/BlogListing'

export const metadata: Metadata = {
  title: 'Blog | Point of Dev',
  description:
    'Software development insights and guides from Point of Dev, a software company in Sri Lanka',
  openGraph: {
    title: 'Blog | Point of Dev',
    description:
      'Software development insights and guides from Point of Dev, a software company in Sri Lanka',
    url: 'https://pointofdev.com/blog',
    siteName: 'Point of Dev',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* ─── Nav placeholder ────────────────────────────────────────────────────
          TODO: Add <Link href="/blog">Blog</Link> to your existing site nav here.
          ─────────────────────────────────────────────────────────────────────── */}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1e1e2e]/50 px-6 py-24 text-center sm:py-32">
        {/* Decorative background elements */}
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-full -translate-x-1/2 opacity-20 blur-[120px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.5),transparent_70%)]" />
        <div className="absolute right-0 top-0 -z-10 h-[300px] w-1/3 opacity-10 blur-[100px] bg-indigo-600" />
        
        <div className="mx-auto max-w-3xl">
          {/* Subtle top label */}
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-indigo-400 mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Point of Dev — Sri Lanka
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Insights</span>
          </h1>
          <p className="mt-8 text-xl text-[#94a3b8] leading-relaxed max-w-2xl mx-auto">
            Deep dives into software engineering, digital strategy, and the tech landscape from our team in Colombo.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <BlogListing posts={posts} />
      </section>
    </main>
  )
}
