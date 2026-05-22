import { Link } from 'react-router'

import type { MaterialLandingContent } from '@/content/landings/materialLandings'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type MaterialLandingPageProps = {
  content: MaterialLandingContent
}

export function MaterialLandingPage({ content }: MaterialLandingPageProps) {
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

      <article className="relative mx-auto w-full max-w-5xl px-6 pt-12 pb-16 md:px-10">
        <header className="space-y-4 border border-[#dbe1e7] bg-white/85 p-6" style={{ clipPath: 'inset(0 round 22px)' }}>
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-[#111418] md:text-5xl">{content.title}</h1>
          <p className="text-base leading-relaxed text-[#3f474f] md:text-lg">{content.intro}</p>
        </header>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">Quick Answer</h2>
          <p className="mt-3 text-base leading-relaxed text-[#3f474f]">{content.quickAnswer}</p>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">{content.tableTitle}</h2>
          <div className="mt-4">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#111418]">Parametr</TableHead>
                  <TableHead className="text-[#111418]">Wartość / wpływ</TableHead>
                  <TableHead className="text-[#111418]">Rekomendacja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.tableRows.map((row) => (
                  <TableRow key={row.parameter}>
                    <TableCell className="font-medium text-[#111418]">{row.parameter}</TableCell>
                    <TableCell className="text-[#3f474f]">{row.value}</TableCell>
                    <TableCell className="text-[#3f474f]">{row.recommendation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">{content.howToTitle}</h2>
          <ol className="mt-4 space-y-3 pl-5 text-base text-[#3f474f] list-decimal">
            {content.howToSteps.map((step) => (
              <li key={step.title}>
                <span className="font-semibold text-[#111418]">{step.title}:</span> {step.description}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-2xl font-semibold text-[#111418]">FAQ</h2>
          <div className="mt-4 space-y-4">
            {content.faq.map((item) => (
              <article key={item.question} className="border border-[#dbe1e7] bg-[#f8fafc] p-4" style={{ clipPath: 'inset(0 round 14px)' }}>
                <h3 className="text-lg font-semibold text-[#111418]">{item.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#3f474f]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 border border-[#dbe1e7] bg-white/90 p-6" style={{ clipPath: 'inset(0 round 20px)' }}>
          <h2 className="text-xl font-semibold text-[#111418]">Przejdź do optymalizacji</h2>
          <p className="mt-2 text-base text-[#3f474f]">
            Jeśli masz już wymiary płyty i listę elementów, przejdź do narzędzia i wygeneruj układ rozkroju.
          </p>
          <Link
            to={content.cta.href}
            className="mt-4 inline-flex w-fit items-center border border-[#ff7a1a] bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ea6f17]"
            style={{ clipPath: 'inset(0 round 12px)' }}
          >
            {content.cta.label}
          </Link>
        </section>
      </article>
    </main>
  )
}
