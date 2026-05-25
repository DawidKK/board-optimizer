export type GlossaryLink = {
  label: string
  href: string
}

export type GlossaryEntry = {
  slug: string
  term: string
  metaTitle: string
  metaDescription: string
  definition: string
  practicalExample: string
  parentPillar: GlossaryLink
  contextualLinks: GlossaryLink[]
}

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    slug: 'kerf',
    term: 'Kerf',
    metaTitle: 'Kerf - definicja i przykład w rozkroju | Słownik PILSEN',
    metaDescription: 'Co to jest kerf w CNC i jak wpływa na rozkrój płyt. Krótka definicja, przykład praktyczny i linki kontekstowe.',
    definition:
      'Kerf to szerokość materiału usuwanego przez narzędzie podczas cięcia i bezpośrednio wpływa na realny wymiar elementów oraz potrzebne odstępy w układzie rozkroju.',
    practicalExample:
      'Jeśli frez ma kerf 3 mm, a odstępy nie są skorygowane, finalny element może wyjść za wąski. Dlatego w zleceniu seryjnym ustawiasz stały kerf i weryfikujesz go na próbce przed pełnym cięciem.',
    parentPillar: { label: 'Nesting CNC', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
      { label: 'Rozkrój płyt MDF', href: '/rozkroj-plyt-mdf' },
    ],
  },
  {
    slug: 'nesting-cnc',
    term: 'Nesting CNC',
    metaTitle: 'Nesting CNC - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Definicja nestingu CNC, zastosowanie w stolarni i praktyczny przykład planowania rozkroju.',
    definition:
      'Nesting CNC to algorytmiczne rozmieszczanie elementów na płycie w celu ograniczenia odpadu i przygotowania układu możliwego do wykonania na maszynie.',
    practicalExample:
      'Przy zleceniu z 40 formatkami tworzysz dwa warianty nestingu i wybierasz ten z niższym odpadem, ale bez elementów nieumieszczonych. To skraca poprawki i ułatwia przekazanie planu na halę.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'Jak używać narzędzia rozkroju', href: '/blog/jak-poprawnie-uzywac-narzedzia-do-rozkroju-plyt-meblowych' },
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
    ],
  },
  {
    slug: 'cutlist',
    term: 'Cutlist',
    metaTitle: 'Cutlist - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Co to jest cutlist i jak pomaga w przygotowaniu produkcji. Definicja, przykład i linki do powiązanych treści.',
    definition:
      'Cutlist to uporządkowana lista elementów do wycięcia zawierająca wymiary, ilości i identyfikatory potrzebne do poprawnego przygotowania rozkroju oraz produkcji.',
    practicalExample:
      'Operator dostaje cutlist z nazwami elementów i ilościami, dzięki czemu szybko wykrywa brakujące pozycje przed uruchomieniem cięcia. To zmniejsza ryzyko braków materiałowych i poprawek po fakcie.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'Blog PILSEN', href: '/blog' },
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
    ],
  },
  {
    slug: 'formatka',
    term: 'Formatka',
    metaTitle: 'Formatka - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Definicja formatki w produkcji mebli i przykład jej roli w optymalizacji rozkroju.',
    definition:
      'Formatka to pojedynczy prostokątny element wycinany z płyty, opisany wymiarami i ilością, będący podstawową jednostką wejściową dla algorytmu rozkroju.',
    practicalExample:
      'Dla korpusu szafki dodajesz formatki boków, dna i wieńców, a system rozkłada je na płycie. Gdy jedna formatka ma błędny wymiar, cały plan może być niewykonalny mimo poprawnego wyglądu podglądu.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'Rozkrój płyt MDF', href: '/rozkroj-plyt-mdf' },
      { label: 'Rozkrój sklejki', href: '/rozkroj-sklejki' },
    ],
  },
  {
    slug: 'uslojenie-plyty',
    term: 'Usłojenie płyty',
    metaTitle: 'Usłojenie płyty - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Co oznacza usłojenie płyty w rozkroju i kiedy kierunek dekoru ma znaczenie.',
    definition:
      'Usłojenie płyty to kierunek dekoru lub włókien materiału, który może ograniczać rotację elementów i wpływać jednocześnie na estetykę oraz poziom odpadu.',
    practicalExample:
      'Przy frontach kuchennych zachowujesz jednolity kierunek usłojenia, nawet jeśli odpad rośnie o kilka procent. Dzięki temu unikasz wizualnych różnic między sąsiadującymi elementami po montażu.',
    parentPillar: { label: 'Rozkrój sklejki', href: '/rozkroj-sklejki' },
    contextualLinks: [
      { label: 'Artykuł o usłojeniu', href: '/blog/nowosc-rozkroj-zgodnie-z-uslojeniem-plyty' },
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
    ],
  },
  {
    slug: 'odpad-materialowy',
    term: 'Odpad materiałowy',
    metaTitle: 'Odpad materiałowy - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Definicja odpadu materiałowego w rozkroju płyt oraz praktyczny sposób jego oceny.',
    definition:
      'Odpad materiałowy to część powierzchni płyty, która pozostaje niewykorzystana po rozmieszczeniu elementów i służy jako kluczowy wskaźnik efektywności rozkroju.',
    practicalExample:
      'Po optymalizacji widzisz 14% odpadu i porównujesz to z wariantem 11%, który ma więcej elementów nieumieszczonych. Wybierasz plan 14%, bo zapewnia kompletność zlecenia i mniejsze ryzyko opóźnień.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
      { label: 'Blog PILSEN', href: '/blog' },
    ],
  },
  {
    slug: 'yield-materialowy',
    term: 'Yield materiałowy',
    metaTitle: 'Yield materiałowy - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Co to jest yield materiałowy i jak interpretować go w codziennej pracy stolarni.',
    definition:
      'Yield materiałowy to procent powierzchni płyty efektywnie wykorzystany przez elementy w planie rozkroju i odwrotność poziomu odpadu.',
    practicalExample:
      'Jeśli layout daje 88% yield, a poprzedni standard miał 82%, oszczędzasz materiał bez zmiany wolumenu produkcji. Tę metrykę porównujesz tydzień do tygodnia, aby monitorować stabilność procesu.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
      { label: 'Rozkrój płyt MDF', href: '/rozkroj-plyt-mdf' },
    ],
  },
  {
    slug: 'margines-technologiczny',
    term: 'Margines technologiczny',
    metaTitle: 'Margines technologiczny - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Definicja marginesu technologicznego i jego wpływu na bezpieczny plan cięcia.',
    definition:
      'Margines technologiczny to celowo pozostawiony pas materiału przy krawędzi płyty, który zwiększa bezpieczeństwo procesu i ogranicza ryzyko błędów wykonawczych.',
    practicalExample:
      'W zleceniu ustawiasz margines 10 mm na każdej krawędzi, żeby uniknąć kolizji i niestabilności cięcia przy granicznych pozycjach. Strata kilku milimetrów zwykle kosztuje mniej niż poprawki po błędzie produkcyjnym.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'Rozkrój płyt MDF', href: '/rozkroj-plyt-mdf' },
      { label: 'Rozkrój sklejki', href: '/rozkroj-sklejki' },
    ],
  },
  {
    slug: 'odstep-bezpieczenstwa',
    term: 'Odstęp bezpieczeństwa',
    metaTitle: 'Odstęp bezpieczeństwa - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Co oznacza odstęp bezpieczeństwa między elementami w planie rozkroju.',
    definition:
      'Odstęp bezpieczeństwa to minimalna odległość między elementami w układzie, potrzebna do stabilnego prowadzenia narzędzia i ograniczenia ryzyka uszkodzeń.',
    practicalExample:
      'Przy zbyt małym odstępie układ wygląda lepiej pod kątem odpadu, ale na produkcji rośnie ryzyko błędu i odrzutu detalu. Dlatego stosujesz stały, sprawdzony odstęp dla danego procesu i materiału.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
      { label: 'Blog PILSEN', href: '/blog' },
    ],
  },
  {
    slug: 'elementy-nieumieszczone',
    term: 'Elementy nieumieszczone',
    metaTitle: 'Elementy nieumieszczone - definicja i przykład | Słownik PILSEN',
    metaDescription: 'Definicja elementów nieumieszczonych i jak reagować, gdy pojawiają się w wyniku rozkroju.',
    definition:
      'Elementy nieumieszczone to formatki, których algorytm nie zmieścił na płycie przy aktualnych parametrach, co oznacza niekompletny plan realizacyjny.',
    practicalExample:
      'Po optymalizacji widzisz trzy elementy nieumieszczone i zamiast drukować plan od razu dzielisz zlecenie na partię oraz dodatkową płytę. Taka reakcja zapobiega przerwaniu produkcji z powodu brakujących detali.',
    parentPillar: { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    contextualLinks: [
      { label: 'Jak używać narzędzia rozkroju', href: '/blog/jak-poprawnie-uzywac-narzedzia-do-rozkroju-plyt-meblowych' },
      { label: 'FAQ rozkrój płyt', href: '/faq/rozkroj-plyt' },
    ],
  },
]

export function getGlossaryEntryBySlug(slug: string) {
  return GLOSSARY_ENTRIES.find((entry) => entry.slug === slug)
}
