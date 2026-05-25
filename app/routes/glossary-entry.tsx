import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

import { getGlossaryEntryBySlug } from '../../src/content/glossary/glossary'

const baseUrl = 'https://pilsen.pl'
const ogImageUrl = `${baseUrl}/favicon.svg`

export const meta: MetaFunction = ({ params }) => {
  const entry = getGlossaryEntryBySlug(params.slug ?? '')

  if (!entry) {
    return [
      { title: 'Hasło nie znalezione | Słownik PILSEN' },
      { name: 'description', content: 'Szukane hasło słownika nie istnieje.' },
      { name: 'robots', content: 'noindex,follow' },
      { tagName: 'link', rel: 'canonical', href: `${baseUrl}/slownik` },
    ]
  }

  const canonicalUrl = `${baseUrl}/slownik/${entry.slug}`
  return [
    { title: entry.metaTitle },
    { name: 'description', content: entry.metaDescription },
    { name: 'robots', content: 'index,follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:title', content: entry.metaTitle },
    { property: 'og:description', content: entry.metaDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: ogImageUrl },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: entry.metaTitle },
    { name: 'twitter:description', content: entry.metaDescription },
    { name: 'twitter:image', content: ogImageUrl },
  ]
}

export default function GlossaryEntryRoute({ params }: { params: { slug?: string } }) {
  const entry = getGlossaryEntryBySlug(params.slug ?? '')

  if (!entry) {
    throw new Response('Nie znaleziono hasła słownika.', { status: 404 })
  }

  const canonicalUrl = `${baseUrl}/slownik/${entry.slug}`
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Słownik', item: `${baseUrl}/slownik` },
      { '@type': 'ListItem', position: 3, name: entry.term, item: canonicalUrl },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <article className="relative mx-auto w-full max-w-4xl px-6 pt-12 pb-16 md:px-10">
        <nav className="mb-5 text-sm text-[#5b646d]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="underline underline-offset-4">Home</Link></li>
            <li>/</li>
            <li><Link to="/slownik" className="underline underline-offset-4">Słownik</Link></li>
            <li>/</li>
            <li className="text-[#111418]">{entry.term}</li>
          </ol>
        </nav>

        <header className="space-y-4 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 22px)' }}>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#5b646d] uppercase">Hasło słownika</p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-[#111418] md:text-5xl">{entry.term}</h1>
          <p className="text-base leading-relaxed text-[#3f474f]">
            <strong>Definicja:</strong> {entry.definition}
          </p>
        </header>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">Przykład praktyczny</h2>
          <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{entry.practicalExample}</p>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">Linki kontekstowe</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {entry.contextualLinks.map((item) => (
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

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Powrót do filaru</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">
            To hasło jest częścią większego tematu. Przejdź do strony filarowej, aby zobaczyć pełny kontekst decyzji.
          </p>
          <Link
            to={entry.parentPillar.href}
            className="mt-4 inline-flex w-fit items-center border border-[#ff7a1a] bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ea6f17]"
            style={{ clipPath: 'inset(0 round 12px)' }}
          >
            {entry.parentPillar.label}
          </Link>
        </section>
      </article>
    </main>
  )
}
