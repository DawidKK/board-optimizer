import type { MetaFunction } from 'react-router'

import { ComingSoonPage } from './coming-soon'

const pageTitle = 'PILSEN - Rozkrój płyt meblowych i produkcja mebli CNC'
const pageDescription =
  'PILSEN rozwija platformę do automatyzacji produkcji mebli: rozkrój płyt meblowych, nesting CNC i komponenty gotowe do produkcji.'
const canonicalUrl = 'https://board-optimizer.netlify.app/'

export const meta: MetaFunction = () => [
  { title: pageTitle },
  { name: 'description', content: pageDescription },
  { name: 'robots', content: 'index,follow' },
  { tagName: 'link', rel: 'canonical', href: canonicalUrl },
  { property: 'og:title', content: pageTitle },
  { property: 'og:description', content: pageDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: canonicalUrl },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: pageTitle },
  { name: 'twitter:description', content: pageDescription },
]

export default function IndexRoute() {
  return <ComingSoonPage />
}
