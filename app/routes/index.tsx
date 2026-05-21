import type { MetaFunction } from 'react-router'

import { ComingSoonPage } from './coming-soon'

const pageTitle = 'PILSEN - Rozkrój płyt meblowych i produkcja mebli CNC'
const pageDescription =
  'PILSEN rozwija platformę do automatyzacji produkcji mebli: rozkrój płyt meblowych, nesting CNC i komponenty gotowe do produkcji.'
const canonicalUrl = 'https://pilsen.pl/'
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

export default function IndexRoute() {
  return <ComingSoonPage />
}
