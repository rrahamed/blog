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
    <main className="min-h-screen bg-black">
      {/* ─── Nav placeholder ────────────────────────────────────────────────────
          TODO: Add <Link href="/blog">Blog</Link> to your existing site nav here.
          ─────────────────────────────────────────────────────────────────────── */}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 px-6 py-28 text-center sm:py-36 bg-black">
        {/* Ambient atmosphere glows from pointofdev.com */}
        <div className="absolute left-[-10%] top-[-20%] -z-10 h-[500px] w-[500px] opacity-20 blur-[130px] bg-blue-600 rounded-full" />
        <div className="absolute right-[-5%] bottom-[-10%] -z-10 h-[400px] w-[400px] opacity-15 blur-[120px] bg-emerald-500 rounded-full" />
        
        <div className="mx-auto max-w-4xl">
          {/* Section Marker */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400 mb-10 backdrop-blur-md">
            Insights & Story
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Dev Box</span>
          </h1>
          <p className="mt-10 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Building the next generation of AI-powered products. Deep dives from our technical team in Colombo.
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
