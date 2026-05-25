import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

import { boardCuttingFaqHubContent } from '../../src/content/faq/boardCuttingFaqHub'

const content = boardCuttingFaqHubContent
const canonicalUrl = 'https://pilsen.pl/faq/rozkroj-plyt'
const ogImageUrl = 'https://pilsen.pl/favicon.svg'

export const meta: MetaFunction = () => [
  { title: content.metaTitle },
  { name: 'description', content: content.metaDescription },
  { name: 'robots', content: 'index,follow' },
  { tagName: 'link', rel: 'canonical', href: canonicalUrl },
  { property: 'og:title', content: content.metaTitle },
  { property: 'og:description', content: content.metaDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: canonicalUrl },
  { property: 'og:image', content: ogImageUrl },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: content.metaTitle },
  { name: 'twitter:description', content: content.metaDescription },
  { name: 'twitter:image', content: ogImageUrl },
]

export default function FaqRozkrojPlytRoute() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://pilsen.pl/' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: canonicalUrl },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <section className="relative mx-auto w-full max-w-4xl px-6 pt-12 pb-16 md:px-10">
        <header className="space-y-4 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 22px)' }}>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#5b646d] uppercase">FAQ Hub</p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-[#111418] md:text-5xl">
            {content.title}
          </h1>
          <p className="text-base leading-relaxed text-[#3f474f] md:text-lg">{content.lead}</p>
        </header>

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">Quick Answer</h2>
          <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{content.quickAnswer}</p>
        </section>

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/90 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-2xl font-semibold text-[#111418]">Najczęstsze pytania</h2>
          <div className="mt-4 space-y-4">
            {content.items.map((item) => (
              <article key={item.question} className="border border-[#dbe1e7] bg-[#f8fafc] p-4">
                <h3 className="text-lg font-semibold text-[#111418]">{item.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#3f474f]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/85 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-xl font-semibold text-[#111418]">Linki kontekstowe</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">
            Przejdź do stron, które pomogą zamienić odpowiedzi FAQ na konkretne decyzje produkcyjne.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {content.contextualLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="border border-[#dbe1e7] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#2f3a44] transition-colors hover:bg-[#eef2f6]"
                style={{ clipPath: 'inset(0 round 12px)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section
          className="mt-8 border border-[#dbe1e7] bg-white/85 p-6"
          style={{ clipPath: 'inset(0 round 20px)' }}
        >
          <h2 className="text-xl font-semibold text-[#111418]">Kalkulatory w przygotowaniu</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">
            Pracujemy nad kalkulatorami odpadu i wariantami materiałowymi. Do czasu publikacji używaj aktualnych
            poradników i stron materiałowych, aby porównywać ustawienia i planować rozkrój na podstawie tych samych
            zasad.
          </p>
        </section>
      </section>
    </main>
  )
}
