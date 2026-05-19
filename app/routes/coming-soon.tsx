import type { MetaFunction } from 'react-router'

import { CabinetPreview } from '../../src/components/CabinetPreview'
import { Badge } from '../../src/components/ui/badge'
import { Button } from '../../src/components/ui/button'

const pageTitle = 'Wkrótce - Przyszłość produkcji mebli | Board Optimizer'
const pageDescription =
  'Poznaj nadchodzącą platformę do automatycznego generowania elementów meblowych, nestingu CNC i produkcji mebli.'
const canonicalUrl = 'https://board-optimizer.netlify.app/coming-soon'

export const meta: MetaFunction = () => [
  { title: pageTitle },
  { name: 'description', content: pageDescription },
  { name: 'robots', content: 'index,follow' },
  { tagName: 'link', rel: 'canonical', href: canonicalUrl },
  { property: 'og:title', content: pageTitle },
  { property: 'og:description', content: pageDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: canonicalUrl },
]

export default function ComingSoonRoute() {
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
      <div className="pointer-events-none absolute -left-28 top-0 h-80 w-80 bg-linear-to-br from-[#ff7a1a]/22 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-5.5rem] h-80 w-80 bg-linear-to-br from-[#7f8b99]/20 to-transparent blur-3xl" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 md:px-10 lg:grid-cols-2">
        <div className="space-y-7">
          <Badge
            variant="outline"
            className="border-[#d7dde4] bg-white/70 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.28em] uppercase text-[#3f474f]"
          >
            WKRÓTCE
          </Badge>

          <h1 className="max-w-xl text-5xl leading-tight font-semibold tracking-tight text-[#111418] sm:text-6xl">
            Przyszłość produkcji mebli.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[#3f474f]">
            Budujemy platformę, która automatycznie generuje elementy meblowe, nesting CNC,
            listy materiałów i komponenty gotowe do produkcji na podstawie projektu kuchni.
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-[#5b646d]">
            Od projektu do gotowych elementów CNC — bez ręcznego liczenia i chaosu w
            produkcji.
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              className="h-11 border border-[#ff7a1a] bg-[#ff7a1a] px-6 text-base font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] hover:bg-[#ea6f17]"
            >
              Dołącz do early access
            </Button>
          </div>
        </div>

        <div
          className="border border-[#dbe1e7] bg-white/75 p-5 shadow-[0_20px_60px_rgba(17,20,24,0.12)] backdrop-blur-sm"
          style={{ clipPath: 'inset(0 round 28px)' }}
        >
          <CabinetPreview />
        </div>
      </section>
    </main>
  )
}
