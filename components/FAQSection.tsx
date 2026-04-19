'use client'

import { useState } from 'react'

interface FAQItemProps {
  q: string
  a: string
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  
  return (
    <div
      className="border-b border-white/5 py-6 cursor-pointer group"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4">
        <p className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
          {q}
        </p>
        <span
          className={`text-2xl text-emerald-500 transition-transform duration-300 ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          +
        </span>
      </div>
      {open && (
        <p className="mt-4 text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 font-medium">
          {a}
        </p>
      )}
    </div>
  )
}

interface FAQSectionProps {
  items: { q: string; a: string }[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <div className="my-16">
      <h2 className="mb-8 text-2xl font-bold text-white uppercase tracking-widest text-center">Questions</h2>
      <div className="border-t border-white/5">
        {items.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  )
}
