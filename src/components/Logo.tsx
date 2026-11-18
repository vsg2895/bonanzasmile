import Link from 'next/link'

/**
 * BonanzaSmile brand mark, from sites/bonanzasmile.html: a SUNNY YELLOW disc
 * carrying two navy eyes and a wide navy smile — the brand is a smile, drawn
 * as one.
 *
 * Inlined SVG rather than an image: it renders instantly with no extra request
 * and stays crisp at any size. The artwork is aria-hidden; the Link's name is
 * its visible text.
 *
 * The wordmark's second half is CORAL on the light header — but the deeper
 * `brand-dark`, not the mockup's #FF6F61, which is 2.64:1 on this page. On the
 * navy footer the yellow is used instead (9.3:1).
 *
 * `onDark` is for the footer. One component, so the header's mark and the
 * footer's can never drift apart.
 *
 * `taglineClassName` lets a caller hide the tagline where the header runs out
 * of room, rather than shipping a second, shorter logo.
 */
export default function Logo({
  className = '',
  taglineClassName = '',
  onDark = false,
}: {
  className?: string
  taglineClassName?: string
  onDark?: boolean
}) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 ${
        onDark ? 'focus-visible:ring-offset-navy' : 'focus-visible:ring-offset-paper'
      } ${className}`.trim()}
    >
      <svg viewBox="0 0 42 42" className="h-[38px] w-[38px] shrink-0 sm:h-[42px] sm:w-[42px]" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="21" fill="#ffc93c" />
        <circle cx="14.5" cy="16.5" r="2.6" fill="#1b2a4a" />
        <circle cx="27.5" cy="16.5" r="2.6" fill="#1b2a4a" />
        <path d="M11.5 24.5c2.4 4.4 5.6 6.4 9.5 6.4s7.1-2 9.5-6.4" fill="none" stroke="#1b2a4a" strokeWidth="3.2" strokeLinecap="round" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-display text-[20px] tracking-[-0.01em] sm:text-[22px] ${onDark ? 'text-white' : 'text-ink'}`}>
          Bonanza<span className={onDark ? 'text-accent' : 'text-brand-dark'}>Smile</span>
        </span>
        <span className={`mt-[5px] text-[10.5px] font-semibold uppercase tracking-[0.2em] ${onDark ? 'text-night-muted' : 'text-muted'} ${taglineClassName}`.trim()}>
          Happy casino picks
        </span>
        {/* The link's name is its visible text plus this — no aria-label that
            could disagree with what is on screen. */}
        <span className="sr-only"> home</span>
      </span>
    </Link>
  )
}
