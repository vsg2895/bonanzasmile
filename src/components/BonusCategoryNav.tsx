import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import { COPY } from '@/constants/copy'
import type { BonusSection } from '@/lib/api'

/**
 * The catch-all heading, which the mix deliberately leaves out.
 *
 * Every offer not filed under a real type lands under "Special Offers", so it
 * is not a type at all — it is the whole area, already reachable from the nav
 * and the offers page. Hidden here rather than in the admin: the admin's
 * "Shown" switch would also remove it from the menu and the sections.
 */
export const CATCH_ALL_SLUG = 'special-offers'

/**
 * How many fills the icon plate cycles through — the three
 * `.btype-plate[data-tone]` rules in globals.css. The TONE IS PASSED FROM HERE
 * rather than selected in CSS with `:nth-child`, because the grid's source
 * order is the API's: hide one type in the admin and a CSS cycle would
 * silently repaint every plate after it.
 */
const TONES = 3

/**
 * One colour per bonus type, in order, each with the text colour that reads on
 * it at 4.5:1 or better. Kept for anything that needs an actual VALUE rather
 * than a plate tone; the three fills themselves live in globals.css.
 */
const TYPE_COLOURS: ReadonlyArray<{ bg: string; fg: string }> = [
  { bg: '#1f7a62', fg: '#ffffff' },
  { bg: '#6b5bd6', fg: '#ffffff' },
  { bg: '#c2651f', fg: '#ffffff' },
  { bg: '#2f7fd1', fg: '#ffffff' },
  { bg: '#14808f', fg: '#ffffff' },
  { bg: '#c43e68', fg: '#ffffff' },
  { bg: '#2b3fe0', fg: '#ffffff' },
  { bg: '#8a4e9c', fg: '#ffffff' },
]

/** The catch-all's colour, wherever it does appear (its group on the home page). */
const CATCH_ALL_COLOUR = { bg: 'var(--color-ink-soft)', fg: '#ffffff' }

/**
 * The colour of each section, by slug — shared by the mix bar, its keys and
 * the home page's bonus groups, so a type is the same colour everywhere.
 */
export function bonusTypeColours(sections: BonusSection[]): Map<string, { bg: string; fg: string }> {
  const colours = new Map<string, { bg: string; fg: string }>()
  sections
    .filter((section) => section.slug !== CATCH_ALL_SLUG)
    .forEach((section, i) => colours.set(section.slug, TYPE_COLOURS[i % TYPE_COLOURS.length]))
  colours.set(CATCH_ALL_SLUG, CATCH_ALL_COLOUR)
  return colours
}

/**
 * "Browse by bonus type", from sites/bonanzasmile.html's final layer
 * (`.btypes` / `.btype`): a GRID of white cards — six across on a wide screen,
 * three on a tablet, two on a phone — each with a round colour PLATE above the
 * type's name and its offer count on a navy pill in the corner.
 *
 * A grid here, unlike the sibling affliliate's flex row: these cards are
 * centred and stacked, so their width is set by the grid rather than by the
 * label, and a wrapped row of unequal cards would break the rhythm the round
 * plates make across the band.
 *
 * Each card opens that type's own page. The counts are the SITE's — active,
 * claimable, owned by a casino attached here — resolved server-side. Renders
 * nothing when the site has no Bonus area or every type is empty.
 */
export default function BonusCategoryNav({ sections }: { sections: BonusSection[] }) {
  const types = sections.filter((section) => section.slug !== CATCH_ALL_SLUG)
  if (types.length === 0) return null

  const total = types.reduce((sum, section) => sum + section.offers_count, 0)

  return (
    <nav aria-labelledby="bonus-types-heading">
      {/* `brand-dark`: coral on this page ground is 2.64:1 at 13px. */}
      <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-dark">
        {COPY.home.bonusTypesKicker}
      </p>
      <h2 id="bonus-types-heading" className="mb-[26px] mt-3 font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.2vw,52px)]">
        {COPY.home.bonusTypesTitle}
      </h2>

      <ul className="grid grid-cols-2 gap-[18px] min-[46rem]:grid-cols-3 min-[70rem]:grid-cols-6" role="list">
        {types.map((section, i) => (
          <li key={section.id} className="min-w-0">
            <Link
              href={`/bonuses/${section.slug}`}
              className="btype relative flex h-full flex-col items-center gap-3.5 rounded-[28px] px-3 py-6 text-center font-display text-[17px] text-ink"
            >
              <span
                aria-hidden
                data-tone={i % TONES}
                className="btype-plate grid h-16 w-16 shrink-0 place-items-center rounded-full"
              >
                {/* The type's own icon, as in the Bonus menu. A plain <img>:
                    next/image refuses SVG. alt="" because the label names it. */}
                {section.icon_path && (
                  <img src={resolveImageUrl(section.icon_path)!} alt="" width={28} height={28} className="h-7 w-7" />
                )}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">{section.name}</span>
              {/* Navy under white in the card's corner, as the mockup has it —
                  the one dark mark on an otherwise pale band. */}
              <span className="absolute right-3 top-3 grid h-[26px] min-w-[26px] place-items-center rounded-full bg-navy px-1.5 font-sans text-[12px] font-bold text-white">
                {section.offers_count}
                <span className="sr-only"> {section.offers_count === 1 ? COPY.bonusCategory.countOne : COPY.bonusCategory.countMany}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
