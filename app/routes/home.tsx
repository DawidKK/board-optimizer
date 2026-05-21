import type { MetaFunction } from 'react-router'
import BoardOptimizerPage from '../../src/App'

const pageTitle =
  'Rozkrój płyt meblowych online - optymalizacja cięcia płyt | PILSEN'
const pageDescription =
  'Program do rozkroju płyt meblowych online. Planuj optymalizację cięcia, ograniczaj odpady i przygotuj produkcję mebli pod CNC.'
const canonicalUrl = 'https://pilsen.pl/rozkroj-plyt-meblowych'
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

export default function HomeRoute() {
  return <BoardOptimizerPage />
}
