/**
 * All user-facing and SEO-facing wording for this site.
 *
 * The KEY STRUCTURE is identical across every site in the network — same
 * groups, same keys, same order — so the apps stay interchangeable and a
 * component written for one works on all of them.
 *
 * The WORDS are deliberately unique to this site. That is not decoration: the
 * brands are separate domains serving the same catalogue, and if they shipped
 * the same titles, descriptions and headings, Google would treat them as
 * duplicate content and suppress all but one. Every string that reaches a
 * <title>, a meta description, an <h1>/<h2> or a JSON-LD field must therefore
 * read differently here than on the sibling sites.
 *
 * bonanzasmile's angle: NO NASTY SURPRISES. Its unit is the CATCH. Every bonus
 * has one clause that decides whether the rest of it is worth anything — the
 * wagering, the cap, the expiry, the excluded game — and this site's job is to
 * say which one it is, in plain words, before anyone claims. Hence the name
 * and the tone: the writing is warm and unhedged, and the cheerfulness is
 * earned by being straight rather than by being loud. Its sibling affliliate
 * decodes an offer in MONEY, slottering reads the SLOT rules, bettingbetway
 * ranks CASINOS on their terms; this one names the catch.
 *
 * ── Three lines this file does not cross ────────────────────────────────────
 * 1. The mockup's lead says "we check the wagering, test the withdrawals and
 *    verify every licence", and its FAQ promises observed payout times. The
 *    middle claim does NOT ship: nothing here records a funded account or a
 *    timed withdrawal. What the site can honestly say is that it reads the
 *    terms and names what is in them, and that is what the copy says.
 * 2. The mockup also sells "casinos and sportsbooks". The API serves casinos,
 *    so every line here says casinos.
 * 3. The mockup prints a "Min. deposit" per casino and per top-three row.
 *    There is no such column, so no wording promises one; the slot carries the
 *    rating, which is real.
 */
export const COPY = {
  // SEO identity. These three reach the <title>, the meta description and the
  // keywords tag on EVERY page that does not set its own — which is most of
  // them — so they are the strings most likely to be read as duplicate content
  // if a sibling domain ships the same words.
  site: {
    titleTail: 'Casino Bonuses Without The Catch',
    description:
      'names the catch in every casino bonus before you claim it — the clause that decides whether the headline figure is worth anything, written out in plain words.',
    keywords: [
      'casino bonus catch',
      'bonus terms in plain english',
      'wagering requirement explained',
      'fair casino bonuses',
      'casino bonus red flags',
    ],
  },
  nav: {
    casinos: 'Casinos',
    // The page lists every visible bonus, flat and ungrouped, so the menu says
    // what is behind it. winpalack keeps "Special Offers": its page is the
    // grouped bonus-area view and is a different thing.
    specialOffers: 'Bonuses',
    categories: 'Categories',
    // First row inside the header and footer dropdowns: the parent's own page.
    allCasinos: 'All Casinos',
    allOffers: 'All Offers',
  },
  home: {
    bonus: 'Bonuses',
    seeMore: 'See more',
    seeAllBonuses: 'See All Bonuses',
    /**
     * The VISIBLE heading over the bonus-type row.
     *
     * The row used to carry no heading at all — the chips were taken to
     * speak for themselves. They do not: arriving mid-page at a band of
     * unlabelled buttons between the hero and the casino list, there is
     * nothing saying what the set IS, and nothing a screen reader can
     * announce for the landmark beyond a generic label nobody wrote for
     * this page.
     *
     * Worded differently on every domain, like every other <h2> here:
     * eleven sites serve one catalogue, and a shared heading is
     * duplicate content.
     */
    bonusTypesTitle: 'Pick a bonus type',
    heroEyebrow: 'Fresh picks every week',
    // Split in two so the JSX keeps its emphasised highlight while the words
    // change. The highlight is the brand's own phrase.
    // Split in three so the JSX can set the middle phrase in the serif's TRUE
    // italic, which is the hero's whole device.
    heroHeadline: 'Casino bonuses worth',
    heroHighlight: 'smiling about.',
    heroHeadlineTail: '',
    heroSubtitle:
      'Every bonus has one clause that decides whether the rest of it matters. We read the terms, name that clause in plain words, and rank what is left — so the only surprise is a good one.',
    // The head of the hero's top-three card, and the label over its right-hand
    // column. The mockup's column is "Min. deposit"; nothing in the API holds
    // one, so the slot carries the rating.
    podiumTitle: 'Today’s happy picks',
    podiumRatingLabel: 'Rating',
    podiumAll: 'Full rankings',
    // There are no `bandPhrases` on this site: the sibling affliliate slides a
    // marquee under its hero, and this design closes the hero with a wave
    // instead. The key is gone rather than left for a component that no longer
    // reads it.
    topCasinosTitle: 'Casinos we’re happy to name',
    topCasinosSubtitle: 'Ordered by how their bonus terms read once the catch is out in the open. Filter by category.',
    featuredCasinos: 'Browse rankings',
    specialOffers: 'See bonus offers',
    viewAll: 'View all',
    // Leads the home <title>; the year and brand are appended in page.tsx.
    homeTitle: 'Happy Casino Bonus Picks',
    faqTitle: 'Happy to explain.',
    faqSubtitle: 'Straight answers on how we find the catch and what has to be true before a bonus goes on the board.',
    metaDescription:
      'Casino bonuses with the catch named up front: the clause that decides what the headline figure is really worth, written out in plain words before you claim.',
    // ── The "How we rank a casino" band ───────────────────────────────────
    // Three steps, numbered, because they ARE a sequence: each one happens
    // after the one before it. Numbering a set that is not ordered is
    // decoration; numbering this one is information.
    methodTitle: 'How we find the catch',
    methodSubtitle: 'Every bonus on this board goes through the same three passes, in the same order.',
    methodSteps: [
      {
        no: '01',
        verb: 'Read',
        title: 'The terms, not the banner',
        body:
          'The promo page and the terms page rarely say the same thing. We work from the terms: the wagering, what it applies to, the withdrawal cap, the expiry clock and the games that count.',
      },
      {
        no: '02',
        verb: 'Name',
        title: 'The one clause that matters',
        body:
          'Most offers are decided by a single line — a 60x multiplier, a €100 cap on a four-figure win, a seven-day clock. We say which line it is instead of listing all of them and leaving the reader to spot it.',
      },
      {
        no: '03',
        verb: 'Re-read',
        title: 'Again, later',
        body:
          'Terms change quietly. Lapsed offers come off the board, revised ones are read again, and a casino moves when its terms move — up as well as down.',
      },
    ],
    methodLabel: '03 — How it works',
    // Under the three stages: the cycle closes back on the first.
    methodLoop: 'And back to the first pass whenever an operator rewrites its terms',
    // ── The hero monitor: what one pass re-reads ─────────────────────────
    // The same three things the FAQ and the method name — no figure this
    // site does not hold.
    monitorTitle: 'What each pass re-reads',
    monitorStatus: 'Weekly',
    monitorReads: [
      { label: '01 · The figure', text: 'Wagering, and what it applies to' },
      { label: '02 · The catch', text: 'Cap, expiry, excluded games' },
      { label: '03 · The licence', text: 'Which regulator the operator names' },
    ],
    monitorNote: 'A casino moves when its terms move. Lapsed bonuses come off the board.',
    rankingLabel: '01 — The board',
    bonusTypesKicker: '02 — By type',
    bonusesLabel: '04 — The offers',
    faqLabel: '05 — Happy to explain',
  },
  casinos: {
    pageTitle: 'Every Casino On The Board',
    pageDescription:
      'The full list, each casino shown with the bonus it is running, the clause that decides what that bonus is worth, and where it places in its category.',
    // H2 over the offers block on a casino page. The literal 'Special Offers'
    // was hardcoded in the component on all six sites — an identical H2 on
    // every review page in the network.
    offersHeading: 'Bonuses Running Here',
    // Tail of the summary-panel H2: `{casino.name} at a glance`.
    glanceHeadingTail: 'at a glance',
    moreHeading: 'Other casinos worth a smile',
    reviewTitleTail: 'Bonus Terms In Plain Words',
    reviewSignature: 'Every bonus here read from the operator’s own terms page.',
    reviewSummary: 'with the catch in each of its bonuses named from the operator’s own terms rather than its banner.',
    visitCasino: 'Open Casino',
    readReview: 'Read The Review',
    rating: 'Smile score',
    noResults: 'No casinos match this filter yet. Try another category.',
  },
  /**
   * The page behind one bonus type (/bonuses/[slug]).
   *
   * `metaSuffix` is appended to the type's name when the admin wrote no
   * description, so the meta line is still specific to the page rather than
   * boilerplate shared by eight of them.
   */
  bonusCategory: {
    metaSuffix: 'every bonus of this kind on the board right now, with the clause that decides each one named up front and whose offer it is.',
    countOne: 'bonus',
    countMany: 'bonuses',
  },

  specialOffers: {
    pageTitle: 'Every Bonus, Catch Included',
    pageDescription:
      'The whole board in one place: each bonus with its wagering, its withdrawal cap and its expiry stated wherever the operator states them — the catch named, not buried.',
    // Appended to an offer's (shared) bonus text so the sibling sites do not
    // ship an identical meta description for the same offer.
    offerMetaSuffix: 'Read from the operator’s own terms page before it went on the board.',
    claim: 'Claim Bonus',
    noResults: 'No bonuses are on the board right now.',
  },
  categories: {
    pageTitle: 'Casinos By Category',
    pageDescription: 'The same three passes behind every list — pick the category you came for.',
    // Meta-description tail for a single category page. Category records are
    // shared master data, so this is what keeps the nine sites distinct there.
    categoryMetaSuffix: 'ordered by how their bonus terms read once the catch is named: the wagering, the cap, the expiry and the licence behind them.',
    noResults: 'Nothing on the board here yet.',
  },
  newsletter: {
    title: 'Good news only.',
    subtitle: 'One email a week: the bonuses that survived their own terms, and the ones that did not.',
    placeholder: 'Email for weekly happy picks',
    button: 'Subscribe',
    // The coral band above the footer — this site's only capture point, so its
    // heading is a real <h2> rather than the form's own label.
    bandTitle: 'Good news, straight to your inbox.',
    bandSubtitle: 'New casino reviews, the bonuses worth claiming this week, and every ranking change — one short email.',
    // Shown while the address is being checked. The subscribe request waits on
    // a live address-validation call, so the button has to say so rather than
    // just dimming for a second or two.
    checking: 'Checking…',
    // The spam line is NOT optional wording. This is a double opt-in list: an
    // unconfirmed subscriber never receives anything again, and the verify mail
    // is the single most likely message to be filtered — new sender, one link,
    // no history. Telling people where to look is the difference between a
    // signup and a dead row.
    success:
      'Nearly there — check your inbox and confirm your address to finish. '
      + 'If nothing arrives, it may be sitting in spam or junk.',
    // Shown when the API reports email_sent=false — the site is still
    // collecting addresses but its sending is switched off in the admin.
    // Promising an inbox (and a spam folder to search) for mail that will
    // never arrive is worse than not collecting the address at all.
    successNoEmail:
      'You’re on the list. We are not sending confirmation emails from this site at the moment.',
    error: 'That did not send. Please try again.',
  },
  footer: {
    // Short brand blurb in the footer's first column. The mockup gives that
    // column 1.6fr of a four-track grid — roughly 360px — so this runs to two
    // or three lines there by design, unlike the two-column siblings where the
    // same string had to stay on one.
    tagline:
      'Independent casino reviews and rankings, with the catch named up front. We may earn a commission from links on this site; it never changes a score or a position.',
    // Registered postal address, shown beside the copyright line. A physical
    // address in the footer is what mailbox providers and the gambling
    // affiliate compliance checks both look for, and it must match the address
    // used in the email templates.
    // Supplied 2026-11-18. Must stay identical to this site's
    // `registered_address` in the admin (Sites -> Edit -> Legal identity),
    // which is what the legal pages and the email templates print: two
    // different addresses for one brand is a compliance problem, not a typo.
    postalAddress: '11 Fernbank Avenue, Derby, DE22 3KL, United Kingdom',
    disclaimer:
      'Gambling is for adults aged 18 or over and carries real financial risk. Set deposit limits, never chase losses, and only stake what you can afford to lose.',
  },
  errors: {
    notFound: 'That page is not on the board.',
    apiError: 'Could not load this content. Please try again in a moment.',
  },
  reviews: {
    heading: 'What Players Report',
    empty: 'No reports yet — be the first to say how it went.',
    formTitle: 'Add Your Report',
    formIntro: 'Your report appears on this page as soon as you post it.',
    nameLabel: 'Your name',
    emailLabel: 'Email (optional, never published)',
    ratingLabel: 'Rating',
    titleLabel: 'Headline (optional)',
    bodyLabel: 'Your report',
    namePlaceholder: 'First name or nickname',
    emailPlaceholder: 'you@example.com',
    titlePlaceholder: 'One line on whether the bonus paid out as written',
    bodyPlaceholder: 'How did it actually go — wagering, cap, verification, withdrawal?',
    submit: 'Post Report',
    // Two outcomes, because the site can run pre- or post-moderation
    // (Sites -> Publish reviews immediately). The API reports which one
    // applied; promising the wrong one is a promise the page then breaks.
    success: 'Thanks — your report is now live. Scroll up to see it.',
    successPending: 'Thanks — your report has been submitted and will appear once approved.',
    error: 'That did not send. Please check the form and try again.',
    ratingSummary: (avg: number, total: number) =>
      `${avg.toFixed(1)} out of 5 from ${total} ${total === 1 ? 'report' : 'reports'}`,
  },
  // Labels on the phone-only hide / show toggle above each chip list.
  collapse: {
    casinoCategories: 'Casino categories',
    bonusTypes: 'Bonus types',
  },
} as const
