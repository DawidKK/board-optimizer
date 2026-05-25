import type { MetaFunction } from 'react-router'

import { MaterialLandingPage } from '../../src/components/MaterialLandingPage'
import { materialLandings } from '../../src/content/landings/materialLandings'

const content = materialLandings['rozkroj-plyt-mdf']
const canonicalUrl = `https://pilsen.pl/${content.slug}`
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

export default function LandingMdfRoute() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.howToTitle,
    inLanguage: 'pl-PL',
    step: content.howToSteps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.description,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://pilsen.pl/' },
      { '@type': 'ListItem', position: 2, name: 'Rozkrój płyt meblowych', item: 'https://pilsen.pl/rozkroj-plyt-meblowych' },
      { '@type': 'ListItem', position: 3, name: content.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <MaterialLandingPage content={content} />
    </>
  )
}
