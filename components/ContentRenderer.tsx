import type { BlogContentBlock } from '@/lib/types'
import FAQSection from './FAQSection'

interface ContentRendererProps {
  blocks: BlogContentBlock[]
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="prose-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={i}
                className="mb-5 text-lg leading-relaxed text-[#cbd5e1]"
              >
                {block.text}
              </p>
            )

          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="mb-4 mt-10 text-2xl font-bold text-[#f1f5f9] scroll-mt-24"
              >
                {block.text}
              </h2>
            )

          case 'h3':
            return (
              <h3
                key={i}
                id={block.id}
                className="mb-3 mt-7 text-xl font-semibold text-[#f1f5f9] scroll-mt-24"
              >
                {block.text}
              </h3>
            )

          case 'bullets':
            return (
              <ul
                key={i}
                className="mb-5 list-none space-y-2 pl-0"
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-lg leading-relaxed text-[#cbd5e1]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )

          case 'numbers':
            return (
              <ol
                key={i}
                className="mb-5 space-y-3 pl-0 list-none"
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 text-lg leading-relaxed text-[#cbd5e1]"
                  >
                    <span className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                      {j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            )

          case 'tip':
            return (
              <div
                key={i}
                className="mb-5 flex gap-4 rounded-r-lg border-l-4 border-indigo-500 bg-indigo-500/10 px-5 py-4"
              >
                <div>
                  <p className="mb-1 text-sm font-semibold text-indigo-300">
                    {block.label}
                  </p>
                  <p className="text-[#cbd5e1] leading-relaxed">{block.text}</p>
                </div>
              </div>
            )

          case 'table':
            return (
              <div key={i} className="mb-6 overflow-x-auto rounded-xl border border-[#1e1e2e]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-indigo-600/20 border-b border-[#1e1e2e]">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 text-left font-semibold text-indigo-300"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr
                        key={j}
                        className={`border-b border-[#1e1e2e] ${j % 2 === 0 ? 'bg-[#111118]' : 'bg-[#0f0f16]'}`}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="px-4 py-3 text-[#cbd5e1]"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'cta':
            return (
              <div
                key={i}
                className="mb-6 mt-10 rounded-xl border border-indigo-500/40 bg-[#111118] p-8 shadow-[0_0_32px_rgba(99,102,241,0.1)]"
              >
                <h3 className="mb-3 text-xl font-bold text-[#f1f5f9]">
                  {block.heading}
                </h3>
                <p className="mb-5 leading-relaxed text-[#94a3b8]">{block.body}</p>
                <a
                  href={block.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                >
                  {block.linkText} →
                </a>
              </div>
            )

          case 'faq':
            return <FAQSection key={i} items={block.items} />

          default:
            return null
        }
      })}
    </div>
  )
}
