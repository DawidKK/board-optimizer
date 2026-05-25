export type LandingFaqItem = {
  question: string
  answer: string
}

export type LandingTableRow = {
  parameter: string
  value: string
  recommendation: string
}

export type HowToStep = {
  title: string
  description: string
}

export type MaterialLandingContent = {
  slug: 'rozkroj-plyt-mdf' | 'rozkroj-sklejki'
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  quickAnswer: string
  tableTitle: string
  tableRows: LandingTableRow[]
  faq: LandingFaqItem[]
  howToTitle: string
  howToSteps: HowToStep[]
  cta: {
    label: string
    href: string
  }
  glossaryLinks: {
    label: string
    href: string
  }[]
}

export const materialLandings: Record<MaterialLandingContent['slug'], MaterialLandingContent> = {
  'rozkroj-plyt-mdf': {
    slug: 'rozkroj-plyt-mdf',
    title: 'Rozkrój płyt MDF: optymalizacja cięcia i mniejszy odpad',
    metaTitle: 'Rozkrój płyt MDF online - optymalizacja cięcia MDF | PILSEN',
    metaDescription:
      'Praktyczny landing o rozkroju płyt MDF: parametry cięcia, ograniczanie odpadu, FAQ i checklista krok po kroku dla stolarni i CNC.',
    intro:
      'MDF wymaga stabilnych ustawień i precyzyjnego planu rozkroju. Dobrze przygotowany układ ogranicza straty materiału, skraca przygotowanie produkcji i zmniejsza liczbę poprawek na etapie realizacji.',
    quickAnswer:
      'Rozkrój płyt MDF polega na takim rozmieszczeniu formatek, aby zmniejszyć odpad i utrzymać powtarzalność wymiarów. Kluczowe są poprawne dane wejściowe, spójne jednostki i dopasowanie parametrów technologicznych do konkretnej grubości płyty. Dzięki temu plan jest czytelny i gotowy do bezpiecznej realizacji na produkcji.',
    tableTitle: 'Parametry MDF, które wpływają na jakość i odpad',
    tableRows: [
      {
        parameter: 'Grubość płyty',
        value: '10-18 mm (najczęściej)',
        recommendation: 'Dobierz parametry cięcia do konkretnej grubości i nie mieszaj partii bez kontroli ustawień.',
      },
      {
        parameter: 'Margines od krawędzi',
        value: 'Zależny od procesu',
        recommendation: 'Utrzymuj stały margines dla całego zlecenia, aby uniknąć kolizji i błędów przy skrajnych formatkach.',
      },
      {
        parameter: 'Odstęp bezpieczeństwa',
        value: 'Stały dla układu',
        recommendation: 'Nie schodź poniżej bezpiecznych odstępów, bo ryzyko odrzutu i niedokładności rośnie szybciej niż zysk z upakowania.',
      },
      {
        parameter: 'Kontrola pylenia',
        value: 'Wysoka istotność',
        recommendation: 'Planuj serię cięć tak, aby ograniczyć przestoje i utrzymać jakość krawędzi przy dłuższej pracy.',
      },
    ],
    howToTitle: 'Jak przygotować rozkrój MDF krok po kroku',
    howToSteps: [
      {
        title: 'Zbierz dane wejściowe',
        description: 'Ustal format płyty, listę elementów i ilości, a wszystkie wartości zapisz w jednej jednostce.',
      },
      {
        title: 'Ustaw parametry technologiczne',
        description: 'Wprowadź margines, odstęp bezpieczeństwa i parametry narzędzia zgodnie z realnym procesem.',
      },
      {
        title: 'Wygeneruj układ i sprawdź odpad',
        description: 'Porównaj przynajmniej dwa warianty rozkroju i wybierz układ z lepszym kompromisem między odpadem a wykonalnością.',
      },
      {
        title: 'Skontroluj nieumieszczone elementy',
        description: 'Jeśli coś się nie mieści, popraw założenia przed zatwierdzeniem planu na produkcję.',
      },
      {
        title: 'Zatwierdź i przygotuj wydruk',
        description: 'Przed przekazaniem planu zweryfikuj wymiary, ilości i czytelność podglądu dla zespołu produkcyjnego.',
      },
    ],
    faq: [
      {
        question: 'Czy MDF wymaga innych ustawień niż płyta wiórowa?',
        answer:
          'Tak, MDF zwykle wymaga bardziej konserwatywnych założeń technologicznych i stabilnych ustawień procesu. W praktyce warto trzymać spójny margines, odstęp bezpieczeństwa i kontrolę jakości krawędzi, bo te czynniki silnie wpływają na końcowy efekt.',
      },
      {
        question: 'Jaki odpad przy rozkroju MDF można uznać za dobry?',
        answer:
          'To zależy od geometrii zlecenia i ograniczeń technologicznych, ale warto porównywać warianty na tej samej płycie i z tymi samymi parametrami. Najważniejsza jest powtarzalność i brak poprawek, a nie sam najniższy odpad za wszelką cenę.',
      },
      {
        question: 'Czy mogę mieszać grubości MDF w jednym planie?',
        answer:
          'Lepiej tego unikać. Mieszanie grubości komplikuje ustawienia i zwiększa ryzyko błędów podczas realizacji. Bezpieczniej przygotować osobne układy dla każdej grubości materiału.',
      },
      {
        question: 'Co zrobić, gdy część formatek MDF się nie mieści?',
        answer:
          'Najpierw sprawdź poprawność wymiarów i ilości, a potem porównaj warianty ustawień. Jeśli nadal brakuje miejsca, podziel zlecenie na partie albo zmień format płyty.',
      },
      {
        question: 'Czy warto testować kilka wariantów układu MDF?',
        answer:
          'Tak, to jedna z najszybszych metod poprawy wyniku. Dwa lub trzy warianty często pokazują lepszy kompromis między odpadem, czytelnością układu i wygodą pracy zespołu.',
      },
      {
        question: 'Jak przygotować dane, żeby uniknąć błędów w rozkroju MDF?',
        answer:
          'Używaj jednej jednostki, sprawdzaj spójność wymiarów i pilnuj kompletności listy elementów. Błędy danych wejściowych są najczęstszą przyczyną słabego lub niewykonalnego planu.',
      },
      {
        question: 'Czy ten landing zastępuje narzędzie do optymalizacji?',
        answer:
          'Nie, landing porządkuje zasady i parametry pracy z MDF. Właściwy układ formatek wyliczysz w narzędziu, które generuje podgląd i pokazuje nieumieszczone elementy.',
      },
      {
        question: 'Kiedy plan MDF jest gotowy do przekazania na produkcję?',
        answer:
          'Dopiero po kontroli wymiarów, ilości, nieumieszczonych pozycji i czytelności układu. Taka kontrola końcowa ogranicza poprawki i ryzyko strat materiałowych.',
      },
    ],
    cta: {
      label: 'Optymalizuj MDF w narzędziu',
      href: '/rozkroj-plyt-meblowych',
    },
    glossaryLinks: [
      { label: 'Kerf', href: '/slownik/kerf' },
      { label: 'Formatka', href: '/slownik/formatka' },
      { label: 'Odstęp bezpieczeństwa', href: '/slownik/odstep-bezpieczenstwa' },
      { label: 'Yield materiałowy', href: '/slownik/yield-materialowy' },
    ],
  },
  'rozkroj-sklejki': {
    slug: 'rozkroj-sklejki',
    title: 'Rozkrój sklejki: kierunek usłojenia, straty i jakość cięcia',
    metaTitle: 'Rozkrój sklejki online - optymalizacja cięcia sklejki | PILSEN',
    metaDescription:
      'Praktyczny landing o rozkroju sklejki: usłojenie, kierunek cięcia, kontrola strat, FAQ i procedura krok po kroku dla pracy stolarskiej i CNC.',
    intro:
      'Przy sklejce oprócz samego upakowania liczy się także kierunek warstw i estetyka finalnych elementów. Dobrze przygotowany rozkrój łączy niski odpad z przewidywalną jakością wykonania.',
    quickAnswer:
      'Rozkrój sklejki to planowanie układu formatek z uwzględnieniem kierunku usłojenia i ograniczeń technologicznych. Najlepszy wynik nie zawsze oznacza najniższy odpad, ale układ, który można stabilnie wykonać i który utrzymuje spójny wygląd elementów. Dlatego warto oceniać jednocześnie straty, wykonalność i estetykę.',
    tableTitle: 'Parametry sklejki ważne w planowaniu rozkroju',
    tableRows: [
      {
        parameter: 'Kierunek usłojenia',
        value: 'Krytyczny dla estetyki',
        recommendation: 'Włącz kontrolę kierunku, gdy zgodność wizualna elementów ma znaczenie.',
      },
      {
        parameter: 'Warstwowa struktura materiału',
        value: 'Wpływa na cięcie',
        recommendation: 'Planuj układ z zapasem technologicznym, by ograniczyć ryzyko uszkodzeń krawędzi.',
      },
      {
        parameter: 'Margines płyty',
        value: 'Stały w zleceniu',
        recommendation: 'Utrzymuj ten sam margines dla całej partii, aby wynik był powtarzalny.',
      },
      {
        parameter: 'Odstęp między elementami',
        value: 'Zależny od procesu',
        recommendation: 'Nie minimalizuj odstępu agresywnie, jeśli priorytetem jest jakość i bezpieczeństwo realizacji.',
      },
    ],
    howToTitle: 'Jak przygotować rozkrój sklejki krok po kroku',
    howToSteps: [
      {
        title: 'Zdefiniuj wymagania wizualne',
        description: 'Ustal, które elementy muszą zachować spójny kierunek usłojenia i czy rotacja jest dopuszczalna.',
      },
      {
        title: 'Wprowadź dane materiałowe i elementy',
        description: 'Podaj format płyty, listę formatek i ilości, pilnując spójnych jednostek.',
      },
      {
        title: 'Ustaw parametry technologiczne',
        description: 'Skonfiguruj margines i odstępy zgodnie z realnym sposobem obróbki.',
      },
      {
        title: 'Przelicz układ i oceń kompromis',
        description: 'Sprawdź jednocześnie odpad, jakość wizualną i listę elementów nieumieszczonych.',
      },
      {
        title: 'Zatwierdź plan po kontroli końcowej',
        description: 'Przed cięciem potwierdź zgodność wymiarów, orientacji i czytelności układu dla wykonawcy.',
      },
    ],
    faq: [
      {
        question: 'Kiedy kierunek usłojenia w sklejce ma największe znaczenie?',
        answer:
          'Najczęściej wtedy, gdy elementy są widoczne i mają tworzyć spójną linię wizualną. W takich przypadkach warto traktować kierunek usłojenia jako warunek obowiązkowy, nawet jeśli nieco zwiększa odpad.',
      },
      {
        question: 'Czy wyłączenie rotacji zawsze pogarsza wynik?',
        answer:
          'Nie zawsze, ale zwykle zmniejsza liczbę możliwych ułożeń. W praktyce to świadomy kompromis: nieco wyższy odpad w zamian za estetykę i zgodność kierunku materiału.',
      },
      {
        question: 'Jak ograniczyć straty przy rozkroju sklejki?',
        answer:
          'Najlepiej działa porównanie kilku wariantów ustawień i priorytetyzacja elementów krytycznych. Dobrze też sprawdzić, czy wszystkie ograniczenia są rzeczywiście konieczne dla danego zlecenia.',
      },
      {
        question: 'Co zrobić, gdy sklejka daje zbyt dużo elementów nieumieszczonych?',
        answer:
          'Zweryfikuj poprawność danych, następnie porównaj warianty marginesu i odstępów. Jeśli to nie wystarczy, podziel zlecenie na partie lub rozważ inny format płyty.',
      },
      {
        question: 'Czy jeden szablon ustawień sklejki wystarczy do każdego zlecenia?',
        answer:
          'Nie, bo geometria elementów i wymagania wizualne potrafią się znacząco różnić. Warto mieć bazowy zestaw ustawień, ale zawsze zweryfikować go przed finalnym planem.',
      },
      {
        question: 'Jak przygotować dane wejściowe dla sklejki?',
        answer:
          'Podaj format płyty, pełną listę elementów i informację o wymaganym kierunku usłojenia. Spójne jednostki i komplet danych znacząco zmniejszają ryzyko błędnego układu.',
      },
      {
        question: 'Czy landing sklejki zawiera gotowy plan cięcia?',
        answer:
          'Nie, to strona decyzyjna i edukacyjna. Gotowy układ wygenerujesz w narzędziu, które oblicza pozycje elementów oraz pokazuje ewentualne ograniczenia dopasowania.',
      },
      {
        question: 'Kiedy uznać plan rozkroju sklejki za gotowy?',
        answer:
          'Plan jest gotowy, gdy zgadza się orientacja krytycznych elementów, wymiary i liczba sztuk, a zespół może bezpiecznie wykonać układ na produkcji.',
      },
    ],
    cta: {
      label: 'Optymalizuj sklejkę w narzędziu',
      href: '/rozkroj-plyt-meblowych',
    },
    glossaryLinks: [
      { label: 'Usłojenie płyty', href: '/slownik/uslojenie-plyty' },
      { label: 'Nesting CNC', href: '/slownik/nesting-cnc' },
      { label: 'Margines technologiczny', href: '/slownik/margines-technologiczny' },
      { label: 'Elementy nieumieszczone', href: '/slownik/elementy-nieumieszczone' },
    ],
  },
}
