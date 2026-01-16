import { TocItem } from '@/lib/toc'

type TableOfContentsProps = {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className="pb-1 border-b border-stone-300" aria-label="Table of contents">
      <h2 className="text-sm font-text font-semibold mb-0.5 text-stone-700">Contents</h2>
      <ul className="flex flex-col gap-0">
        {items.map((item) => (
          <li
            key={item.id}
            className={`leading-[1.1] ${item.level === 3 ? 'ml-3' : ''}`}
          >
            <a
              href={`#${item.id}`}
              className="text-stone-600 hover:text-black hover:underline font-text text-sm"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
