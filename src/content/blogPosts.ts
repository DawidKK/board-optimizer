export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  metaTitle: string
  metaDescription: string
  lead: string
  sections: BlogSection[]
  mistakes: string[]
  checklist: string[]
  summary: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'jak-poprawnie-uzywac-narzedzia-do-rozkroju-plyt-meblowych',
    title: 'Jak poprawnie używać narzędzia do rozkroju płyt meblowych w aplikacji',
    excerpt:
      'Krótki przewodnik krok po kroku: jak wprowadzać dane, uruchamiać optymalizację cięcia i czytać wyniki rozkroju płyt meblowych.',
    publishDate: '2026-05-19',
    metaTitle: 'Jak używać narzędzia do rozkroju płyt meblowych | Blog PILSEN',
    metaDescription:
      'Sprawdź, jak poprawnie korzystać z narzędzia do rozkroju płyt meblowych: dane wejściowe, optymalizacja cięcia i interpretacja wyników.',
    lead:
      'Aby uzyskać dobry rozkrój płyt meblowych, zacznij od poprawnych danych. Najpierw wpisz format płyty, potem dodaj elementy z wymiarami i ilością. Jeśli pracujesz pod CNC, ustaw parametry technologiczne, takie jak margines i odstępy bezpieczeństwa. Dzięki temu wynik będzie nie tylko estetyczny na podglądzie, ale też możliwy do wykonania na produkcji. Następnie kliknij optymalizację i sprawdź, czy wszystkie elementy zostały umieszczone. Jeżeli część formatek się nie mieści, zmień kolejność priorytetów lub rozdziel zlecenie na partie. Dobrą praktyką jest szybka kontrola: liczba elementów, ich wymiary i udział odpadu. Na końcu przeanalizuj układ na podglądzie płyty i porównaj kilka wariantów, zanim zatwierdzisz cięcie. Takie podejście pozwala ograniczyć błędy, skrócić czas przygotowania i realnie poprawić optymalizację cięcia w codziennej pracy stolarza.',
    sections: [
      {
        heading: '1. Przygotuj poprawne dane wejściowe',
        paragraphs: [
          'Uzupełnij wymiary płyty oraz listę elementów. Każdy element powinien mieć poprawną szerokość, wysokość i ilość, najlepiej w jednej jednostce, np. mm.',
          'Jeśli dane wejściowe są niespójne, nawet najlepszy algorytm nie wygeneruje wiarygodnego planu rozkroju płyt meblowych.',
        ],
      },
      {
        heading: '2. Uruchom optymalizację i sprawdź wynik',
        paragraphs: [
          'Po kliknięciu optymalizacji sprawdź, czy wszystkie elementy zostały umieszczone. Lista nieumieszczonych formatek to sygnał, że trzeba poprawić założenia.',
          'Warto porównać 2-3 warianty ustawień, aby wybrać układ z mniejszym odpadem i lepszą kolejnością pracy na produkcji.',
        ],
      },
      {
        heading: '3. Zweryfikuj plan przed cięciem',
        paragraphs: [
          'Przed startem produkcji skontroluj kluczowe wymiary i ilości oraz upewnij się, że marginesy technologiczne są zgodne z realnym procesem.',
          'Dopiero po tej kontroli zatwierdzaj finalny plan. To prosty sposób, by zmniejszyć ryzyko poprawek i strat materiałowych.',
        ],
      },
    ],
    mistakes: [
      'Wprowadzanie elementów w różnych jednostkach (mm i cm).',
      'Pomijanie parametrów technologicznych przed optymalizacją.',
      'Brak kontroli listy elementów nieumieszczonych.',
    ],
    checklist: [
      'Sprawdź format płyty i jednostki.',
      'Zweryfikuj wymiary oraz ilości elementów.',
      'Ustaw marginesy i odstępy technologiczne.',
      'Porównaj kilka wariantów rozkroju przed zatwierdzeniem.',
    ],
    summary:
      'Poprawne użycie narzędzia do rozkroju to przede wszystkim dobre dane, świadoma optymalizacja i szybka kontrola wyniku. Dzięki temu rozkrój płyt meblowych jest bardziej przewidywalny i opłacalny.',
  },
  {
    slug: 'pilsen-aplikacja-do-rozkroju-plyt-meblowych-i-produkcji',
    title: 'PILSEN - aplikacja do rozkroju płyt meblowych i wsparcia produkcji',
    excerpt:
      'Jak działa PILSEN w praktyce: od projektu od klienta, przez wybór szafek i automatyczne wyliczenia, po nesting, G-code i zarządzanie odpadami.',
    publishDate: '2026-05-19',
    metaTitle: 'PILSEN: aplikacja do rozkroju płyt meblowych | Blog PILSEN',
    metaDescription:
      'Dowiedz się, jak PILSEN zamienia projekt kuchni w gotowe elementy: automatyczne wyliczenia, optymalny rozkrój płyt meblowych, G-code i pamięć odpadów.',
    lead:
      'PILSEN działa prosto: zaczynasz od projektu od projektanta, niezależnie od formatu. To może być profesjonalny plik, PDF, szkic albo nawet kartka z wymiarami. W aplikacji wybierasz predefiniowany typ, np. szafka dolna lub górna, a następnie podajesz jej długość, wysokość i szerokość. Na tej podstawie PILSEN automatycznie wylicza wszystkie potrzebne elementy, więc nie trzeba ręcznie liczyć każdej formatki osobno. Potem dodajesz kolejną szafkę i kolejną, aż cały zestaw kuchenny będzie kompletny. System na bieżąco zapisuje dane, przelicza całość i przygotowuje optymalny rozkrój płyt meblowych. Po zatwierdzeniu układu aplikacja generuje G-code pod produkcję. Dodatkowo PILSEN zapamiętuje odpady materiałowe i w przyszłości może podpowiedzieć, że masz już odpowiedni fragment płyty z wcześniejszej realizacji, np. sprzed pół roku, który wystarczy do wykonania kilku nowych elementów.',
    sections: [
      {
        heading: '1. Od dowolnego projektu do gotowych danych produkcyjnych',
        paragraphs: [
          'Nie musisz zaczynać od specjalistycznego programu. PILSEN przyjmuje logikę pracy z projektu niezależnie od jego formy: od dokumentacji cyfrowej po szkic odręczny.',
          'Zamiast ręcznie rozpisywać formatki, wybierasz gotowy typ szafki i wpisujesz jej podstawowe wymiary. Reszta wyliczeń odbywa się automatycznie.',
        ],
      },
      {
        heading: '2. Automatyzacja szafka po szafce',
        paragraphs: [
          'Proces jest sekwencyjny i wygodny: dodajesz Szafkę 1, potem kolejną, aż zbudujesz pełną listę elementów całej kuchni.',
          'PILSEN stale zapisuje i przelicza dane, dzięki czemu nie tracisz czasu na kartki, kalkulator i ręczne sumowanie każdego detalu.',
        ],
      },
      {
        heading: '3. Rozkrój, G-code i pamięć odpadów',
        paragraphs: [
          'Po uzupełnieniu całego projektu aplikacja układa elementy optymalnie na płycie meblowej i przygotowuje dane pod wykonanie, w tym G-code.',
          'System zapisuje także odpady. Dzięki temu przy kolejnym zleceniu może przypomnieć o wcześniej odłożonych fragmentach płyt, które nadają się np. do wykonania 2-3 nowych elementów.',
        ],
      },
    ],
    mistakes: [
      'Ręczne liczenie elementów mimo dostępnej automatyzacji w aplikacji.',
      'Dodawanie szafek bez pełnych wymiarów (długość, wysokość, szerokość).',
      'Pomijanie wykorzystania zapisanych odpadów przed nowym zleceniem.',
    ],
    checklist: [
      'Wybierz predefiniowany typ szafki i wpisz komplet wymiarów.',
      'Dodaj wszystkie szafki z projektu kuchni przed finalnym przeliczeniem.',
      'Sprawdź optymalny układ na płycie i wygenerowany G-code.',
      'Zweryfikuj, czy system wskazał możliwe do użycia odpady z historii.',
    ],
    summary:
      'PILSEN zamienia nawet prosty szkic kuchni w uporządkowany proces produkcyjny: automatyczne wyliczenia elementów, optymalny rozkrój płyt meblowych, G-code i inteligentne wykorzystanie odpadów w kolejnych realizacjach.',
  },
]

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
