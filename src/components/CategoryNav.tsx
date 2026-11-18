import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import type { Category } from '@shared/types/category'

/**
 * BonanzaSmile category tabs, from sites/bonanzasmile.html (`.tabs`/`.tab` in
 * its final layer): ONE segmented control — a WHITE pill group with a hairline
 * and 6px of padding holding a pill per category, the current one filled
 * SUNNY YELLOW with navy text and its count on a white pill.
 *
 * The strip scrolls sideways rather than wrapping — the mockup keeps it on a
 * single line at every width, and `flex-1 basis-auto` lets the tabs share the
 * space evenly when they all fit.
 *
 * The tabs NAVIGATE rather than filter in place: always the canonical
 * /categories/<slug> route. The query forms (`/?category=`,
 * `/casinos?category=`) are 301'd to it at the edge (lib/seo/redirects.ts), so
 * linking either would spend a redirect per visitor and crawl budget on URLs
 * that resolve elsewhere.
 */
export default function CategoryNav({
  categories,
  selected,
}: {
  categories: Category[]
  selected: string
}) {
  return (
    <nav aria-label="Casino categories">
      <ul className="no-scrollbar flex gap-0 overflow-x-auto rounded-full border-[1.5px] border-line bg-paper p-1.5" role="list">
        {categories.map((c) => {
          const active = c.slug === selected
          return (
            <li key={c.id} className="flex-1 basis-auto">
              <Link
                href={`/categories/${c.slug}`}
                aria-current={active ? 'page' : undefined}
                className={`tab flex min-h-[46px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-[18px] text-[15px] font-semibold ${
                  active ? 'bg-accent text-accent-ink hover:bg-accent' : 'text-ink'
                }`}
              >
                {/* The category's own icon, as in the Casinos menu. A plain <img>:
                    next/image refuses SVG. alt="" because the label names it. */}
                {c.logo_path && (
                  <img src={resolveImageUrl(c.logo_path)!} alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                )}
                <span>{c.name}</span>
                {/* On the yellow tab the count sits on its own WHITE pill, as
                    the mockup has it — navy on yellow is 9.3:1 either way, but
                    the pill is what separates the figure from the label. */}
                {typeof c.casinos_count === 'number' && (
                  <span className={`text-[12.5px] font-bold ${active ? 'rounded-full bg-white px-2 text-accent-ink' : 'text-muted'}`}>{c.casinos_count}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
