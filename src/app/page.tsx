import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBonusArea, getCategories, getCategory, getSpecialOffers } from '@/lib/api'
import type { BonusSection } from '@/lib/api'
import { buildItemListSchema, buildWebPageSchema, jsonLdScript, buildFaqSchema, SHARE_IMAGES } from '@/lib/seo'
import { COPY } from '@/constants/copy'
import { FAQ_ITEMS } from '@/constants/faq'
import CasinoCard, { CASINO_LIST, Stars } from '@/components/CasinoCard'
import BonusCategoryNav from '@/components/BonusCategoryNav'
import BonusGroups from '@/components/BonusGroups'
import CategoryNav from '@/components/CategoryNav'
import FaqAccordion from '@/components/FaqAccordion'
import SpecialOfferCard, { OFFER_GRID } from '@/components/SpecialOfferCard'
import type { Category } from '@shared/types/category'
import type { CasinoWithAttachment } from '@shared/types/casino'
import type { SpecialOffer } from '@shared/types/specialOffer'
import { SITE_URL } from '@/lib/config'
import { casinosHeading } from '@/lib/categories'

/** Offers shown per bonus type in the home page's Bonuses section — one row. */
const HOME_BONUSES_PER_CATEGORY = 3

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? ''
const YEAR = new Date().getFullYear()

type Props = { searchParams: Promise<{ category?: string; page?: string }> }

// Resolve the selected category (default = first/highest-priority) for the home casinos section.
async function resolveCategory(searchParams: Props['searchParams']) {
  const sp = await searchParams
  const categories = (await getCategories()).data
  const selected =
    sp.category && categories.some((c) => c.slug === sp.category) ? sp.category : categories[0]?.slug
  return { categories: categories as Category[], selected }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = `${COPY.home.homeTitle} ${YEAR} | ${SITE_NAME}`
  const description = COPY.home.metaDescription
  return {
    title,
    description,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', url: '/', siteName: SITE_NAME, title, description, images: SHARE_IMAGES },
    twitter: { card: 'summary_large_image', title, description, images: SHARE_IMAGES },
  }
}

export default async function HomePage({ searchParams }: Props) {
  /*
   * THE HOME PAGE HAS ONE PAGE, so `?page=2` is a page past the end.
   *
   * Nothing here is paginated (the full list is /casinos), yet `/?page=2` and
   * every other number a crawler guessed answered 200 with the whole home page
   * and an `index` robots tag: a duplicate of `/` at a URL of its own. A 404
   * says it is not a page at all, the rule every paginated listing here applies
   * past its last page. `?page=1` never reaches this: proxy.ts 301s it to `/`.
   */
  if (Math.max(1, Number((await searchParams).page) || 1) > 1) notFound()

  const { categories, selected } = await resolveCategory(searchParams)

  const [categoryRes, offersRes, anyOffersRes, bonusRes] = await Promise.allSettled([
    selected ? getCategory(selected) : Promise.resolve(null),
    getSpecialOffers(selected, 6),
    // Site-wide, unfiltered, limit 1 — just "does a visible offer exist at all?".
    // Runs alongside the others, so it costs no extra round-trip of latency, and
    // the public endpoint already excludes offers whose visibility is off.
    getSpecialOffers(undefined, 1),
    // The bonus TYPES: the chip row under the hero AND the per-type Bonuses
    // section further down, so each type brings its first
    // HOME_BONUSES_PER_CATEGORY offers (one full row of the three-up grid).
    // The chips only read names, marks and counts, which the server counts
    // over the unlimited set. allSettled means a site without the Bonus area
    // renders neither, and falls back to the plain Special offers grid.
    getBonusArea(HOME_BONUSES_PER_CATEGORY),
  ])

  // Empty when the site does not publish the Bonus area, or when the
  // request failed — the strip renders nothing either way.
  const bonusSections: BonusSection[] = bonusRes.status === 'fulfilled' ? bonusRes.value : []

  const catData =
    categoryRes.status === 'fulfilled' && categoryRes.value ? categoryRes.value.data : null
  const casinos: CasinoWithAttachment[] = catData?.casinos ?? []
  const activeCategory = catData?.category ?? null
  // "See More" is only an affordance when there is actually more: compare the
  // category's full count against the rows this page received, rather than
  // hard-coding the page size on both sides where the two could drift apart.
  const hasMoreCasinos = (catData?.meta?.total ?? 0) > casinos.length
  // Offers are already scoped to the selected category and capped by the backend (?category=&limit=).
  const topOffers: SpecialOffer[] = offersRes.status === 'fulfilled' ? offersRes.value.data : []

  // Whether ANY special offer is visible on this site. Drives the hero CTA:
  // a button leading to an empty page is worse than no button. On a failed
  // request this stays false, so the CTA hides rather than promising content
  // that may not be there.
  const anyOffersVisible: boolean =
    anyOffersRes.status === 'fulfilled' && anyOffersRes.value.data.length > 0

  // Organization schema is emitted site-wide from the root layout; the home
  // page only adds its page-specific ItemList of top casinos.
  //
  // The list is the SELECTED category, not the whole catalogue, so it is named
  // and addressed as that category — it previously claimed the generic name
  // "Top Casinos at <brand>" and pointed at /casinos, describing neither the
  // rows below it nor a URL that renders them.
  const listSchema = buildItemListSchema(
    activeCategory ? `${activeCategory.name} — ${COPY.home.topCasinosTitle}` : COPY.home.topCasinosTitle,
    selected ? `${SITE_URL}/categories/${selected}` : `${SITE_URL}/casinos`,
    casinos.map((c, i) => ({ position: i + 1, name: c.name, url: `${SITE_URL}/casinos/${c.slug}` })),
  )

  const graph = [
    buildWebPageSchema({
      // Mirrors the actual <title>. The previous "Best Online Casinos <year>"
      // was generic boilerplate shipped identically by the sibling domains and
      // matched neither this page's title nor its H1.
      name: `${COPY.home.homeTitle} ${YEAR}`,
      url: SITE_URL,
      description: COPY.home.metaDescription,
    }),
    listSchema,
    // Same array the section below renders — markup-only FAQ is a violation.
    buildFaqSchema(SITE_URL, FAQ_ITEMS),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />

      <main>
        {/* Hero — the mockup's final opening: a BLUE SLAB inset from the page
            edges and rounded, the claim left-aligned in Syne with one phrase
            in pink, and the top three riding beside it on a white card.

            The slab is inset by the same gutter as the header pill and the
            footer, so all three line up down both edges of the page. */}
        <section className="slab overflow-hidden pb-[110px] pt-14 sm:pb-[150px] sm:pt-[84px]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-5">
            <div className="relative z-[1] grid grid-cols-1 items-center gap-10 min-[57rem]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[57rem]:gap-14">
              <div>
                {/* A white pill with a coral dot. Navy text: this sits on the
                    yellow band, where white is 1.54:1. */}
                <p className="live inline-flex items-center gap-2.5 rounded-full bg-white px-[18px] py-2 text-[12.5px] font-bold uppercase tracking-[0.16em] text-ink [&::before]:bg-brand">
                  {COPY.home.heroEyebrow}
                </p>
                <h1 className="mt-6 max-w-[860px] font-display text-[44px] leading-[1] text-balance text-ink sm:text-[clamp(48px,6.4vw,86px)]">
                  {/* The tail is empty on this site — its claim ends on the
                      highlight — so it is rendered only when there IS one,
                      rather than leaving a trailing space in the heading. */}
                  {COPY.home.heroHeadline}{' '}
                  {/* The mockup's #FF6F61 is 1.78:1 on this yellow — below
                      the floor at any size. The highlight keeps its shape (a
                      second colour on the claim's last phrase) in the deeper
                      coral, 3.59:1, which clears the 3:1 that applies to text
                      this size: the h1 starts at 44px. */}
                  <em className="not-italic text-brand-dark">{COPY.home.heroHighlight}</em>
                  {COPY.home.heroHeadlineTail && <> {COPY.home.heroHeadlineTail}</>}
                </h1>
                <p className="mt-5 max-w-[640px] text-[17px] text-ink-soft sm:text-xl">{COPY.home.heroSubtitle}</p>
                <div className="mt-9 flex flex-wrap gap-3.5">
                  <Link href="/casinos" className="btn-or btn-gold min-h-[56px] px-9 text-[17px]">
                    {COPY.home.featuredCasinos}
                  </Link>
                  {anyOffersVisible && (
                    <Link href="/special-offers" className="btn-ln btn-on-dark min-h-[56px] px-9 text-[17px]">
                      {COPY.home.specialOffers}
                    </Link>
                  )}
                </div>
              </div>

              {/* The top three, on the mockup's white card beside the claim.
                  It replaces the sibling sites' podium strip, and it is the
                  one place on this site with a soft shadow — see `.hard-gold`
                  in globals.css.

                  The mockup prints a rank NUMERAL and a "Min. deposit" figure
                  per row. The numeral stays (its own final layer deletes it
                  from the casino CARDS, not from here, and this list is three
                  rows long and explicitly titled "top picks" — the position
                  IS the content). The deposit figure does not: nothing in the
                  API holds a minimum deposit, so that slot carries the
                  RATING, which is real data in the same shape. */}
              {casinos.length >= 3 && (
                <aside className="hard-gold rounded-[32px] bg-paper p-4 sm:p-6" aria-labelledby="podium-heading">
                  <div className="flex items-center justify-between gap-3 border-b border-line pb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
                    <h2 id="podium-heading" className="whitespace-nowrap font-sans text-[12px] font-semibold uppercase tracking-[0.08em]">
                      {COPY.home.podiumTitle}
                    </h2>
                    <span aria-hidden className="whitespace-nowrap">{COPY.home.podiumRatingLabel}</span>
                  </div>
                  <ol className="mb-4">
                    {casinos.slice(0, 3).map((c, i) => (
                      <li key={c.id} className="border-b border-line last:border-b-0">
                        {/* Tighter columns below `sm`: at 320px the padding,
                            the gap and the rank disc together left the name
                            92px, which wrapped "BitStarz" onto two lines. */}
                        <Link href={`/casinos/${c.slug}`} className="group grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-2.5 py-3.5 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:gap-3.5 sm:py-4">
                          {/* The mockup's `.t3n`: a yellow disc with navy
                              numerals. The numeral stays HERE — the network
                              prints no rank on a casino ROW, but this list is
                              three long and titled as picks, so the position
                              is the content. */}
                          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-[13px] text-accent-ink sm:h-[42px] sm:w-[42px] sm:text-[18px]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="min-w-0">
                            {/* WRAPS rather than truncating. The card is ~280px
                                wide on a 320px phone, and with the rank disc and
                                the rating pill either side the name had about
                                150px — enough to turn "7 Bit Casino" into "7 Bit
                                Casi…". A list of top picks whose names are cut
                                off identifies nothing. */}
                            <span className="block font-display text-[17px] leading-tight text-ink transition-colors [overflow-wrap:anywhere] group-hover:text-brand-dark sm:text-[19px]">{c.name}</span>
                            <span className="mt-1 flex items-center gap-2 text-[13px] text-muted">
                              <Stars rating={c.rating} />
                            </span>
                          </span>
                          {/* The mockup's `.t3d` pill — coral-soft under its
                              own deep coral, 4.95:1. */}
                          <span className="rounded-full bg-brand-tint px-2 py-1 font-display text-[14px] text-brand-dark tabular-nums sm:px-2.5 sm:text-[15px]">
                            {c.rating.toFixed(1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <Link href="/casinos" className="inline-flex min-h-11 items-center font-bold text-brand-dark transition-colors hover:text-ink">
                    {COPY.home.podiumAll} <span aria-hidden className="ml-1">→</span>
                  </Link>
                </aside>
              )}
            </div>
          </div>

          {/* The wave that closes the yellow band — the mockup's `.hero-wave`.
              An SVG rather than a border-radius: the curve dips in the middle
              and lifts at both ends, which no radius describes. Decorative, so
              `aria-hidden`; `preserveAspectRatio="none"` lets it stretch to any
              width without changing its height. */}
          <svg
            aria-hidden
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[60px] w-full sm:h-[110px]"
          >
            <path d="M0 0 C 360 120 1080 120 1440 0 L1440 120 L0 120 Z" fill="var(--color-cream)" />
          </svg>
        </section>

        {/* The ranking — category tabs, then the casinos as rows.

            There is no marquee under this hero: the wave closes it instead, so
            `COPY.home.bandPhrases` is gone rather than left as a key nothing
            reads. */}
        <section className="pb-14 pt-10 sm:pb-[72px]" aria-labelledby="top-casinos-heading">
          <div className="mx-auto max-w-[1200px] px-4">
            {/* `brand-dark`: coral on this page ground is 2.64:1. */}
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-dark">{COPY.home.rankingLabel}</p>
            <h2 id="top-casinos-heading" className="mt-3 font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.4vw,54px)]">
              {COPY.home.topCasinosTitle}
            </h2>
            <p className="mt-3 max-w-[540px] text-ink-soft">{COPY.home.topCasinosSubtitle}</p>

            {categories.length > 0 && selected && (
              <div className="mt-6">
                <CategoryNav categories={categories} selected={selected} />
              </div>
            )}

            {casinos.length === 0 ? (
              <p className="mt-6 rounded-[28px] border border-dashed border-line-strong bg-paper p-10 text-center text-muted">
                {COPY.casinos.noResults}
              </p>
            ) : (
              <ol className={`mt-[22px] ${CASINO_LIST}`}>
                {casinos.map((casino, i) => (
                  <CasinoCard key={casino.id} casino={casino} rank={i + 1} />
                ))}
              </ol>
            )}

            {activeCategory && hasMoreCasinos && (
              <div className="mt-6 flex justify-center">
                <Link href={`/categories/${selected}`} className="btn-ln min-h-12 px-[22px] text-[15px]">
                  See more casinos<span className="sr-only"> — {casinosHeading(activeCategory.name)}</span> <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Bonus types as one stacked bar. Renders nothing without a Bonus area. */}
        {bonusSections.length > 0 && (
          <section className="pb-14 sm:pb-[72px]">
            <div className="mx-auto max-w-[1200px] px-4">
              <BonusCategoryNav sections={bonusSections} />
            </div>
          </section>
        )}

        {/* Bonuses — one card per type, built from the same getBonusArea
            payload as the mix bar and the menus. A site without the Bonus
            area keeps the flat grid below. */}
        {bonusSections.length > 0 ? (
          <section className="py-14 sm:py-[72px]" aria-labelledby="bonus-heading">
            <div className="mx-auto max-w-[1200px] px-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="bonus-heading" className="font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.4vw,54px)]">
                  {COPY.home.bonus}
                </h2>
                <Link href="/special-offers" className="-my-3 inline-flex min-h-11 items-center py-3 font-bold text-brand-dark transition-colors hover:text-ink">
                  {COPY.home.viewAll}<span className="sr-only"> bonuses</span> <span aria-hidden className="ml-1">→</span>
                </Link>
              </div>
              <BonusGroups sections={bonusSections} />
            </div>
          </section>
        ) : topOffers.length > 0 && (
          <section className="py-14 sm:py-[72px]" aria-labelledby="offers-heading">
            <div className="mx-auto max-w-[1200px] px-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="offers-heading" className="font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.4vw,54px)]">
                  {COPY.home.specialOffers}
                </h2>
                <Link href="/special-offers" className="-my-3 inline-flex min-h-11 items-center py-3 font-bold text-brand-dark transition-colors hover:text-ink">
                  {COPY.home.viewAll}<span className="sr-only"> special offers</span> <span aria-hidden className="ml-1">→</span>
                </Link>
              </div>
              <div className={`mt-6 ${OFFER_GRID}`}>
                {topOffers.map((offer) => (
                  <SpecialOfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How we rank — the stages of a review, as cards. */}
        <section className="px-2 py-14 sm:px-4 sm:py-[72px]" aria-labelledby="method-heading">
          <div className="mx-auto max-w-[1240px] rounded-[24px] bg-surface px-5 py-12 sm:rounded-[32px] sm:px-10">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-dark">{COPY.home.methodLabel}</p>
            <h2 id="method-heading" className="mt-3 font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.4vw,54px)]">
              {COPY.home.methodTitle}
            </h2>
            <p className="mt-3 max-w-[540px] text-ink-soft">{COPY.home.methodSubtitle}</p>
            <ol className="mt-[34px] grid grid-cols-1 gap-3.5 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {COPY.home.methodSteps.map((step) => (
                <li key={step.no} className="step rounded-[20px] bg-paper p-[26px] shadow-[0_2px_0_var(--color-line)]">
                  <p className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-dark">
                    <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-btn text-[15px] font-bold text-white">{step.no}</span>
                    {step.verb}
                  </p>
                  <h3 className="mt-2.5 font-display text-[22px] text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-[15px] text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-3 text-sm font-semibold text-ink-soft">
              <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
              </svg>
              <span>{COPY.home.methodLoop}</span>
            </p>
          </div>
        </section>

        {/* FAQ — the questions two across under their own head, as in the
            mockup. Every answer is in the HTML, open or closed, which the
            FAQPage schema above requires. */}
        <section className="pb-4 pt-14 sm:pt-[72px]" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-[1200px] px-4">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-dark">{COPY.home.faqLabel}</p>
            <h2 id="faq-heading" className="mt-3 font-display text-[32px] leading-[1.05] text-ink sm:text-[clamp(34px,4.2vw,52px)]">
              {COPY.home.faqTitle}
            </h2>
            <p className="mt-3 max-w-[540px] text-ink-soft">{COPY.home.faqSubtitle}</p>
            <div className="mt-7">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
