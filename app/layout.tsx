import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Point of Dev — A Software Company | Sri Lanka',
  description:
    'Point of Dev is a software company in Sri Lanka specialising in web development, mobile apps, and custom digital products.',
  metadataBase: new URL('https://pointofdev.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0f] font-sans antialiased" suppressHydrationWarning>
        {/* ─── Site-wide nav ─────────────────────────────────────────────────
            TODO: Add your existing site navigation here.
            Make sure to include: <Link href="/blog">Blog</Link>
            ─────────────────────────────────────────────────────────────────── */}
        {children}
      </body>
    </html>
  )
}
