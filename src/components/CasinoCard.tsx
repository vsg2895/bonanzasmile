import Image from 'next/image'
import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import { COPY } from '@/constants/copy'
import type { CasinoWithAttachment } from '@shared/types/casino'

/** How many region chips a row shows before collapsing the rest into a count. */
const REGIONS_SHOWN = 3

/**
 * Exported so the home page's top-three list shows the same stars as a row.
 *
 * The amber is `--color-gold` (#C98800), deeper than the mockup's #FFB400,
 * which is 1.78:1 on white — a filled star and an empty one would read as the
 * same shape. The exact figure is printed beside the stars everywhere they
 * appear, so the colour is never the only carrier.
 */
export function Stars({ rating, onDark = false }: { rating: number; onDark?: boolean }) {
  // `Math.round` rather than a partial star: the ratings are whole or half
  // numbers and a half-filled glyph at 17px reads as a rendering fault.
  const filled = Math.round(rating)
  const on = onDark ? 'text-night-accent' : 'text-gold'
  const off = onDark ? 'text-night-line' : 'text-line-soft'

  return (
    <span
      className="inline-flex items-center tracking-[1px] text-[17px] leading-none"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? on : off} aria-hidden>
          ★
        </span>
      ))}
    </span>
  )
}

/**
 * The list the rows sit in — the mockup's final `.list`: ONE column at every
 * width, because each row is a full-width pill. Callers render
 * `<ol className={CASINO_LIST}>`; the order of the list is the ranking.
 */
export const CASINO_LIST = 'grid grid-cols-1 gap-4'

/**
 * A casino as a ROW — `.bz` in sites/bonanzasmile.html: a pill-shaped white
 * row carrying a CIRCULAR logo, the name and its regions, the welcome bonus on
 * a warm panel, the rating as a conic-gradient RING, and the two actions.
 *
 * The radius really is 999px on a full-width row, which is the design: this
 * site rounds everything, and the row is its most visible statement of that.
 * Below `74rem` it steps down to a 36px slab, because a pill that tall reads
 * as a lozenge rather than a row.
 *
 * NO RANK NUMERAL. The mockup draws one and then removes it in its own `fixes`
 * layer (`.bz-rank{display:none!important}`), which is also this network's
 * rule — the `<ol>` order IS the ranking. `rank` is still accepted so callers
 * did not change; what marks the leader is the yellow border and warm fill its
 * row takes (`.rw-top` in globals.css), driven by `rank === 1` rather than
 * `:first-child`, so page 2 of /casinos does not crown its first row.
 *
 * The mockup's "Min. deposit" and "Payout" chips are NOT shipped: no column in
 * the API holds either. The chips carry `countries`, which is real.
 */
export default function CasinoCard({
  casino,
  rank,
}: {
  casino: CasinoWithAttachment
  rank?: number
}) {
  // The casino's "Image" (logo), NOT the wide "Banner Image" used big on the
  // casino page. Falls back to the banner if there is no Image.
  const image = resolveImageUrl(casino.image_path ?? casino.banner_image)

  const regions = casino.countries ?? []
  const shownRegions = regions.slice(0, REGIONS_SHOWN)
  const extraRegions = regions.length - shownRegions.length
  const isLeader = rank === 1
  // The ring is filled to the rating's share of 5. Rounded to a whole percent:
  // a conic gradient takes a length, and the figure inside carries the detail.
  const ringPercent = Math.round((Math.max(0, Math.min(5, casino.rating)) / 5) * 100)

  return (
    <li
      className={`rw grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 rounded-[28px] p-4 min-[40rem]:grid-cols-[110px_minmax(0,1fr)_96px] min-[40rem]:gap-5 min-[40rem]:rounded-[36px] min-[40rem]:p-5 min-[74rem]:grid-cols-[120px_minmax(0,1.3fr)_minmax(0,1fr)_96px_200px] min-[74rem]:gap-7 min-[74rem]:rounded-full min-[74rem]:py-4 min-[74rem]:pl-4 min-[74rem]:pr-8 ${
        isLeader ? 'rw-top' : ''
      }`}
    >
      {/* The logo plate, a CIRCLE. White whenever there IS artwork: operator
          logos arrive with their own white ground baked in, and any other
          colour behind one shows as a hard rectangle inside the circle. With
          no artwork it becomes a yellow disc carrying the operator's name —
          navy on yellow, never white (1.54:1). A FIXED column at every
          breakpoint, never `auto`: operator artwork ranges from square to wide
          banner, and an auto track sizes itself to whichever it happens to get. */}
      <div
        className={`flex h-[84px] w-[84px] items-center justify-center overflow-hidden rounded-full p-2 min-[40rem]:h-[110px] min-[40rem]:w-[110px] min-[74rem]:h-[120px] min-[74rem]:w-[120px] ${
          image ? 'border border-line bg-white' : 'bg-accent'
        }`}
      >
        {image ? (
          <Image src={image} alt={`${casino.name} logo`} width={320} height={320} sizes="(max-width: 640px) 84px, 120px" className="h-full w-full rounded-full object-contain" />
        ) : (
          <span className="px-1 text-center font-display text-[12px] leading-tight text-accent-ink [overflow-wrap:anywhere] min-[40rem]:text-[15px]">
            {casino.name}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[21px] leading-[1.1] text-ink [overflow-wrap:anywhere] min-[40rem]:text-[26px]">{casino.name}</h3>
        <p className="mt-1 flex items-center gap-2 text-[15px] text-muted">
          <Stars rating={casino.rating} />
          <span aria-hidden className="font-semibold tabular-nums">{casino.rating.toFixed(1)}</span>
        </p>

        {shownRegions.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Accepts players from">
            {shownRegions.map((country) => (
              <li key={country.id} className="rounded-full bg-win-bg px-3 py-0.5 text-xs font-semibold text-win">
                {country.name}
              </li>
            ))}
            {extraRegions > 0 && (
              /* A count, not a tooltip: the full list is on the review page,
                 and a hover affordance is invisible on a phone. */
              <li className="rounded-full bg-surface px-3 py-0.5 text-xs font-semibold text-accent-dark">+{extraRegions} more</li>
            )}
          </ul>
        )}
      </div>

      {/* The welcome bonus on the mockup's warm panel — yellow on the leader's
          row. Dropped entirely when the operator has none, rather than left as
          an empty panel. */}
      {casino.bonuses && (
        <div className={`col-span-2 rounded-[24px] px-5 py-3.5 min-[40rem]:col-start-2 min-[40rem]:col-end-[-1] min-[74rem]:col-auto min-[74rem]:col-start-auto ${isLeader ? 'bg-accent' : 'bg-surface'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-accent-dark">Welcome bonus</p>
          <p className="my-1 font-display text-[21px] leading-[1.2] text-ink [overflow-wrap:anywhere]">{casino.bonuses}</p>
        </div>
      )}

      {/* The rating as a dial. Hidden below `40rem`, exactly as the mockup
          hides it — at 84px of logo there is no room for a 96px ring, and the
          figure is already printed beside the stars above.
          `aria-hidden`: the stars carry the same value to a screen reader. */}
      <div
        aria-hidden
        style={{ '--p': ringPercent } as React.CSSProperties}
        className="ring relative hidden h-24 w-24 place-content-center place-items-center rounded-full min-[40rem]:grid"
      >
        <b className="relative font-display text-[26px] leading-none text-ink">{casino.rating.toFixed(1)}</b>
        <small className="relative mt-0.5 text-[11px] font-bold uppercase tracking-[0.1em] leading-none text-muted">Score</small>
      </div>

      <div className="col-span-2 flex flex-col gap-2.5 min-[40rem]:col-start-1 min-[40rem]:col-end-[-1] min-[40rem]:flex-row min-[40rem]:items-center min-[74rem]:col-auto min-[74rem]:col-start-auto min-[74rem]:flex-col">
        <a
          href={casino.attachment.affiliate_url}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="btn-or min-h-[46px] w-full px-5 text-[15px] min-[40rem]:flex-1 min-[74rem]:w-full"
        >
          {COPY.casinos.visitCasino}
        </a>
        <Link
          href={`/casinos/${casino.slug}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-4 font-display font-semibold text-ink transition-colors hover:text-brand-dark min-[40rem]:flex-1"
        >
          {COPY.casinos.readReview}
        </Link>
      </div>
    </li>
  )
}
