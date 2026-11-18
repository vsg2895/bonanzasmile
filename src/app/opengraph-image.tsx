import { ImageResponse } from 'next/og'
import { SHARE_IMAGE_ALT } from '@/lib/seo'

/**
 * Dynamic Open Graph / Twitter card image.
 *
 * Until now no og:image existed anywhere while twitter:card was set to
 * `summary_large_image`, so every share of these pages rendered as an empty
 * card — the single most visible SEO/social gap on the site. Generating it here
 * means it can never drift out of sync with the site name, and needs no binary
 * asset committed to the repo.
 *
 * Next.js links this file automatically on the home page only. Every other
 * page sets its own `openGraph`, which REPLACES the layout's (metadata
 * merges shallowly) and drops this card — so those pages restate it via
 * `SHARE_IMAGES` in lib/seo, which also holds the alt text below.
 */
export const alt = SHARE_IMAGE_ALT
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // The hero's own sunny band with its soft bloom at the right —
          // this design's single piece of decoration. Navy on yellow
          // throughout: white on #FFC93C is 1.54:1.
          background: '#ffc93c',
          backgroundImage:
            'radial-gradient(40% 55% at 85% 20%, rgba(255,224,138,0.95), rgba(255,201,60,0) 70%)',
          color: '#1b2a4a',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 8,
            textTransform: 'uppercase',
            background: '#ffffff',
            color: '#1b2a4a',
            borderRadius: 999,
            padding: '14px 36px',
          }}
        >
          Bonuses Without The Catch
        </div>
        {/* Satori needs an EXPLICIT display on any element with more than one
            child — the wordmark is two coloured spans, so this one says flex
            rather than relying on the browser default it never sees. */}
        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 700,
            marginTop: 24,
            padding: '0 60px',
          }}
        >
          {/* One word in two colours, so the two spans must touch exactly.
              The second half takes the DEEPER coral: #FF6F61 on this yellow is
              2.1:1, under even the 3:1 large-text floor. */}
          <span>Bonanza</span><span style={{ color: '#c23426' }}>Smile</span>
        </div>
        <div style={{ display: 'flex', fontSize: 30, marginTop: 34, color: '#44506b' }}>
          18+ · Gamble responsibly
        </div>
      </div>
    ),
    size,
  )
}
