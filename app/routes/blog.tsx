import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

import { BLOG_POSTS } from '../../src/content/blogPosts'

const pageTitle = 'Blog o rozkroju płyt meblowych i produkcji mebli | PILSEN'
const pageDescription =
  'Poradniki dla stolarzy i produkcji mebli: rozkrój płyt meblowych, optymalizacja cięcia, nesting CNC i przygotowanie produkcji.'
const canonicalUrl = 'https://pilsen.pl/blog'
const ogImageUrl = 'https://pilsen.pl/favicon.svg'

export const meta: MetaFunction = () => [
  { title: pageTitle },
  { name: 'description', content: pageDescription },
  { name: 'robots', content: 'index,follow' },
  { tagName: 'link', rel: 'canonical', href: canonicalUrl },
  { property: 'og:title', content: pageTitle },
  { property: 'og:description', content: pageDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: canonicalUrl },
  { property: 'og:image', content: ogImageUrl },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: pageTitle },
  { name: 'twitter:description', content: pageDescription },
  { name: 'twitter:image', content: ogImageUrl },
]

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default function BlogRoute() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <section className="relative mx-auto w-full max-w-7xl px-6 pt-12 pb-16 md:px-10">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.24em] text-[#5b646d] uppercase">
            BLOG PILSEN
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#111418] md:text-5xl">
            Rozkrój płyt meblowych i produkcja mebli bez chaosu
          </h1>
          <p className="text-base leading-relaxed text-[#3f474f] md:text-lg">
            Konkretne poradniki dla stolarzy i zespołów produkcyjnych: jak planować cięcie,
            ograniczać odpady i przygotować stabilny proces CNC.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col border border-[#dbe1e7] bg-white/80 p-5 shadow-[0_14px_42px_rgba(17,20,24,0.08)]"
              style={{ clipPath: 'inset(0 round 22px)' }}
            >
              <p className="text-xs font-medium tracking-wide text-[#5b646d] uppercase">
                {formatDate(post.publishDate)}
              </p>
              <h2 className="mt-3 text-2xl leading-tight font-semibold text-[#111418]">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3f474f]">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-flex w-fit items-center border border-[#ff7a1a] bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ea6f17]"
                style={{ clipPath: 'inset(0 round 12px)' }}
              >
                Czytaj poradnik
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
