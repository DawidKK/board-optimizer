export type FaqHubItem = {
  question: string
  answer: string
}

export type FaqHubContextualLink = {
  label: string
  href: string
}

export type FaqHubContent = {
  title: string
  metaTitle: string
  metaDescription: string
  lead: string
  quickAnswer: string
  items: FaqHubItem[]
  contextualLinks: FaqHubContextualLink[]
}

export const boardCuttingFaqHubContent: FaqHubContent = {
  title: 'FAQ: rozkrój płyt meblowych',
  metaTitle: 'FAQ rozkrój płyt meblowych - pytania i odpowiedzi | PILSEN',
  metaDescription:
    'Najczęstsze pytania o rozkrój płyt meblowych: odpad, parametry, nieumieszczone elementy i kontrola planu przed produkcją.',
  lead:
    'Ten FAQ Hub zbiera odpowiedzi na pytania, które realnie wpływają na koszt, jakość i tempo pracy stolarni. Każda odpowiedź jest krótka i operacyjna, aby szybciej podejmować decyzje przed cięciem.',
  quickAnswer:
    'Rozkrój płyt meblowych działa najlepiej, gdy dane są spójne, parametry technologiczne ustawione pod maszynę, a wynik oceniany przez kompletność elementów i poziom odpadu. Przed produkcją warto wykonać krótki preflight: sprawdzić wymiary krytyczne, listę nieumieszczonych formatek i zgodność ustawień z realnym procesem cięcia.',
  items: [
    {
      question: 'Jak szybko ocenić, czy wynik rozkroju jest opłacalny?',
      answer:
        'Najpierw sprawdź dwa wskaźniki: kompletność elementów i procent odpadu. Jeśli wszystko się mieści, porównaj wynik z drugim wariantem ustawień, aby zobaczyć, czy da się obniżyć stratę materiału bez pogorszenia wykonalności. Opłacalny plan to taki, który ogranicza odpad, ale nie zwiększa ryzyka poprawek na hali.',
    },
    {
      question: 'Co oznacza lista elementów nieumieszczonych i czy można ją ignorować?',
      answer:
        'Lista nieumieszczonych pozycji oznacza, że przy aktualnych założeniach nie uzyskasz kompletnego planu na jednej płycie. Nie należy jej ignorować, bo to częsta przyczyna braków podczas realizacji. Trzeba skorygować parametry, podzielić zlecenie na partie albo zaplanować dodatkową płytę przed przekazaniem planu na produkcję.',
    },
    {
      question: 'Jak dobrać margines i odstępy bezpieczeństwa w praktyce?',
      answer:
        'Parametry należy ustawić zgodnie z realną technologią cięcia, a nie tylko pod najlepszy wynik wizualny na podglądzie. Zbyt małe marginesy zwiększają ryzyko kolizji i błędów wykonania, zbyt duże podnoszą odpad. Dobrą praktyką jest utrzymywanie stałego profilu ustawień dla konkretnej maszyny i rodzaju materiału.',
    },
    {
      question: 'Kiedy porównywać kilka wariantów rozkroju?',
      answer:
        'Porównanie wariantów warto robić zawsze przy większych zleceniach, niestandardowych formatach płyt albo gdy pojawiają się elementy nieumieszczone. Wystarczy zmienić jeden parametr naraz i sprawdzić wpływ na odpad oraz kompletność. Taka metoda daje decyzję opartą na liczbach, a nie na intuicji operatora.',
    },
    {
      question: 'Czy ten sam workflow działa dla MDF i sklejki?',
      answer:
        'Tak, podstawowy workflow jest ten sam: dane wejściowe, parametry technologiczne, optymalizacja i kontrola wyniku. Różnice pojawiają się w priorytetach materiałowych, na przykład usłojeniu sklejki lub stabilności cięcia MDF. Dlatego warto utrzymywać osobne praktyki robocze dla materiałów, ale wspólny standard walidacji przed startem produkcji.',
    },
    {
      question: 'Jak uniknąć błędów jednostek i wymiarów w danych wejściowych?',
      answer:
        'Najbezpieczniej przyjąć jedną jednostkę dla całego zlecenia, zwykle milimetry, i trzymać ten standard we wszystkich pozycjach. Przed optymalizacją sprawdź skrajne wartości i duplikaty, bo literówki często dają układ pozornie poprawny. Kilkuminutowa walidacja wejścia zwykle eliminuje najdroższe błędy wykonawcze.',
    },
    {
      question: 'Jak przygotować plan do przekazania na halę produkcyjną?',
      answer:
        'Przed przekazaniem planu wykonaj krótki preflight: potwierdź wymiary krytyczne, liczbę elementów, parametry technologiczne i brak pominiętych pozycji. Następnie sprawdź czytelność podglądu do druku, aby operator nie miał wątpliwości podczas cięcia. Taki standard skraca czas wdrożenia zlecenia i zmniejsza ryzyko korekt.',
    },
    {
      question: 'Kiedy włączać zachowanie usłojenia i jaki ma to koszt?',
      answer:
        'Usłojenie warto włączać dla elementów widocznych, gdzie kierunek dekoru wpływa na odbiór jakości przez klienta. Ogranicza to swobodę układania formatek, więc zwykle podnosi odpad i liczbę trudnych przypadków. Decyzję najlepiej podejmować świadomie: estetyka dla części krytycznych, a maksymalny uzysk dla elementów technicznych.',
    },
  ],
  contextualLinks: [
    { label: 'Rozkrój płyt meblowych', href: '/rozkroj-plyt-meblowych' },
    { label: 'Rozkrój płyt MDF', href: '/rozkroj-plyt-mdf' },
    { label: 'Rozkrój sklejki', href: '/rozkroj-sklejki' },
    { label: 'Blog o rozkroju i CNC', href: '/blog' },
  ],
}
