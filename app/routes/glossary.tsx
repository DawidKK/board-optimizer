import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

import { GLOSSARY_ENTRIES } from '../../src/content/glossary/glossary'

const pageTitle = 'Słownik pojęć rozkroju płyt - 10 definicji | PILSEN'
const pageDescription =
  'Słownik pojęć dla stolarni i CNC: kerf, nesting, cutlist, formatka, usłojenie i inne terminy potrzebne do poprawnego rozkroju płyt.'
const canonicalUrl = 'https://pilsen.pl/slownik'
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

export default function GlossaryRoute() {
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
      <section className="relative mx-auto w-full max-w-6xl px-6 pt-12 pb-16 md:px-10">
        <header className="space-y-4 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 22px)' }}>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#5b646d] uppercase">Słownik</p>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-[#111418] md:text-5xl">
            Słownik pojęć rozkroju płyt
          </h1>
          <p className="text-base leading-relaxed text-[#3f474f] md:text-lg">
            10 krótkich definicji technicznych z przykładami praktycznymi. Każde hasło prowadzi do kontekstu
            produkcyjnego, aby łatwiej podejmować decyzje przy planowaniu rozkroju.
          </p>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {GLOSSARY_ENTRIES.map((entry) => (
            <Link
              key={entry.slug}
              to={`/slownik/${entry.slug}`}
              className="border border-[#dbe1e7] bg-white/85 p-5 transition-colors hover:bg-white"
              style={{ clipPath: 'inset(0 round 18px)' }}
            >
              <h2 className="text-xl font-semibold text-[#111418]">{entry.term}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">{entry.definition}</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  )
}
