import type { ReactNode } from 'react'

import {
  boardCuttingPillarContent,
  type FaqItem,
  type PillarSection,
} from '@/content/pillar/boardCutting'

type PillarContentProps = {
  quickAnswer: string
  sections: PillarSection[]
  faq: FaqItem[]
}

function ContentCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      className="border border-[#dbe1e7] bg-white/85 p-6"
      style={{ clipPath: 'inset(0 round 20px)' }}
    >
      <h2 className="text-xl font-semibold text-[#111418]">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#3f474f]">{children}</div>
    </section>
  )
}

export function PillarContent({ quickAnswer, sections, faq }: PillarContentProps) {
  return (
    <div className="space-y-6">
      <section
        className="border border-[#dbe1e7] bg-white/90 p-6"
        style={{ clipPath: 'inset(0 round 22px)' }}
      >
        <h2 className="text-xl font-semibold tracking-tight text-[#111418] md:text-2xl">
          Quick Answer
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#3f474f] md:text-base">{quickAnswer}</p>
      </section>

      {sections.map((section) => (
        <ContentCard key={section.heading} title={section.heading}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ContentCard>
      ))}

      <section
        className="border border-[#dbe1e7] bg-white/90 p-6"
        style={{ clipPath: 'inset(0 round 20px)' }}
      >
        <h2 className="text-xl font-semibold text-[#111418]">FAQ: Rozkrój płyt meblowych</h2>
        <div className="mt-4 space-y-4">
          {faq.map((item) => (
            <article
              key={item.question}
              className="border border-[#dbe1e7] bg-[#f8fafc] p-4"
              style={{ clipPath: 'inset(0 round 14px)' }}
            >
              <h3 className="text-base font-semibold text-[#111418]">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3f474f]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BoardCuttingPillarContent() {
  return <PillarContent {...boardCuttingPillarContent} />
}
