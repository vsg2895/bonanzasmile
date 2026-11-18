/**
 * Frequently asked questions for this site.
 *
 * Rendered VISIBLY on the home page and emitted as FAQPage structured data from
 * this same array. Google requires the two to match; markup-only FAQ is a
 * guidelines violation, which is why the page maps over this constant rather
 * than duplicating the text.
 *
 * The wording is unique to this site: these answers are indexable page content,
 * and they are exactly the kind of text an answer engine quotes. Here they
 * explain THE CATCH — the single clause that decides what a bonus is worth —
 * because that is what this brand is. Its siblings answer the neighbouring
 * questions (affliliate: what an offer is worth in money; slottering: the slot
 * rules; bettingbetway: which casino to trust) and none of them may be echoed.
 *
 * Nothing below claims a figure this site cannot show. The mockup's own lead
 * says "we test the withdrawals" and its FAQ promises observed payout times;
 * neither ships, because nothing here records a funded account or a timed
 * withdrawal. The answers say what the site actually does, which is read the
 * terms and name what is in them.
 */
export const FAQ_ITEMS = [
  {
    question: 'What do you mean by “the catch”?',
    answer:
      'The one clause that decides whether the headline figure is worth anything. Usually it is the wagering multiplier and what it applies to, but it can just as easily be a cap on what a bonus win can pay out, a seven-day expiry, or a list of games that do not count. Most offers have exactly one line like that, and we name it instead of printing all twenty and leaving you to find it.',
  },
  {
    question: 'Is a bigger bonus a better bonus?',
    answer:
      'Usually not. A 200% match at 50x wagering on deposit plus bonus is a much harder offer than a 100% match at 25x on the bonus alone — the second asks for a quarter of the staking for a similar amount of money. The percentage on the banner is the one number that costs the operator nothing to print.',
  },
  {
    question: 'What is a withdrawal cap, and why does it matter?',
    answer:
      'A ceiling on what you may take out of a bonus win, often stated as a multiple of the deposit or a flat figure like €100. It matters because it applies after you have met every other condition: you can clear the wagering in full, win far more than the cap, and still only be paid the cap. We state it wherever the operator does, because it is the clause most likely to turn a good result into a disappointing one.',
  },
  {
    question: 'Do you test the casinos with real money?',
    answer:
      'No, and we do not claim to. What we do is read the terms page behind every offer and put what it says next to the headline — the wagering, the cap, the expiry, the excluded games and the licence. Where a figure is not published, we leave it out rather than estimate it.',
  },
  {
    question: 'How do you choose which casinos go on the board?',
    answer:
      'A casino earns a place when its bonus terms are published in full and readable, and when it names the regulator it answers to. Terms that cannot be found, or that contradict the promo page, keep an operator off the board regardless of how good the offer looks.',
  },
  {
    question: 'Do you earn money from these links?',
    answer:
      'Yes. We may be paid a commission when someone signs up through a link on this site, and the footer says so on every page. It never changes a score, a position on the board, or which clause we name as the catch — an operator with hostile terms reads as one here whether it pays us or not.',
  },
  {
    question: 'How often is the board updated?',
    answer:
      'Weekly, and whenever an operator rewrites its terms. Offers change quietly: a multiplier is raised, a cap is added, an offer lapses. A lapsed bonus comes off the board, a revised one is read again, and a casino moves — up as well as down — when its terms move.',
  },
  {
    question: 'What should I check before I claim anything?',
    answer:
      'Three things, in this order: what the wagering applies to (the bonus alone, or deposit plus bonus), whether a cap limits what the win can pay out, and how long you have. Those decide the offer. Everything else on a terms page is detail by comparison — and if any of the three is missing, treat that as the answer.',
  },
] as const
