export type PillarSection = {
  heading: string
  paragraphs: string[]
}

export type FaqItem = {
  question: string
  answer: string
}

export const boardCuttingPillarContent = {
  quickAnswer:
    'Rozkrój płyt meblowych to automatyczne rozmieszczenie formatek na jednej płycie tak, aby zmniejszyć odpad i przyspieszyć przygotowanie produkcji. W praktyce podajesz wymiary płyty oraz elementów, a narzędzie wylicza układ z pozycjami X/Y, pokazuje nieumieszczone formatki i procent wykorzystania materiału.',
  sections: [
    {
      heading: 'Definicja: co to jest rozkrój płyt meblowych',
      paragraphs: [
        'Rozkrój płyt meblowych to proces planowania, jak ułożyć prostokątne elementy na płycie bazowej, aby zmniejszyć straty materiału i zachować poprawne wymiary produkcyjne.',
        'W cyfrowym workflow zamiast ręcznego rysowania układu, algorytm wylicza położenia elementów i od razu pokazuje, czy cały zestaw mieści się na wskazanym formacie płyty.',
      ],
    },
    {
      heading: 'Jak działa algorytm optymalizacji cięcia',
      paragraphs: [
        'Algorytm analizuje dostępną powierzchnię płyty i próbuje umieścić kolejne elementy tak, by jak najlepiej wykorzystać wolne pola i ograniczyć odpad.',
        'Jeśli włączysz ograniczenia technologiczne, takie jak margines płyty, odstęp bezpieczeństwa czy kierunek usłojenia, wynik jest dopasowany do realnych warunków pracy na produkcji.',
      ],
    },
    {
      heading: 'Dane wejściowe potrzebne do poprawnego wyniku',
      paragraphs: [
        'Aby otrzymać wiarygodny plan, podaj szerokość i wysokość płyty oraz listę elementów z wymiarami i ilością. Wszystkie dane powinny być w jednej jednostce, najczęściej w milimetrach.',
        'Przy pracy pod CNC warto uzupełnić parametry technologiczne: średnicę narzędzia, odstęp bezpieczeństwa i margines od krawędzi, bo te wartości bezpośrednio wpływają na to, co realnie da się wyciąć.',
      ],
    },
    {
      heading: 'Wynik: co dostajesz po optymalizacji',
      paragraphs: [
        'Po uruchomieniu optymalizacji dostajesz podgląd płyty z położeniem każdej formatki oraz podsumowanie wykorzystania materiału i odpadu procentowego.',
        'Jeśli część elementów nie mieści się na płycie, narzędzie pokazuje listę nieumieszczonych pozycji, dzięki czemu od razu wiesz, co trzeba zmienić przed przekazaniem planu do cięcia.',
      ],
    },
    {
      heading: 'Najczęstsze błędy, które pogarszają rozkrój',
      paragraphs: [
        'Najczęstsze problemy to mieszanie jednostek (mm i cm), złe wymiary elementów oraz pomijanie parametrów technologicznych. Te błędy często prowadzą do układu, który wygląda dobrze na ekranie, ale nie nadaje się do produkcji.',
        'Drugi częsty błąd to brak kontroli listy elementów nieumieszczonych. Zawsze sprawdź, czy wszystkie pozycje zostały ułożone, zanim zatwierdzisz rozkrój i rozpoczniesz cięcie.',
      ],
    },
  ] as PillarSection[],
  faq: [
    {
      question: 'Jak policzyć odpad po rozkroju płyty meblowej?',
      answer:
        'Odpad liczysz jako różnicę między powierzchnią płyty a sumą powierzchni ułożonych elementów. Wynik procentowy to odpad podzielony przez powierzchnię płyty razy 100%. Ta metryka pozwala szybko porównać kilka wariantów układu i wybrać bardziej oszczędny.',
    },
    {
      question: 'Czy mogę użyć narzędzia dla MDF, sklejki i płyty wiórowej?',
      answer:
        'Tak, jeśli pracujesz na elementach prostokątnych i podajesz poprawne wymiary, ten sam proces optymalizacji sprawdzi się dla różnych materiałów. Przy każdym materiale warto jednak zweryfikować parametry technologiczne, takie jak margines i odstępy bezpieczeństwa.',
    },
    {
      question: 'Co oznacza lista nieumieszczonych elementów?',
      answer:
        'To elementy, które nie zmieściły się na płycie przy aktualnych założeniach. Najczęściej trzeba zwiększyć format płyty, skorygować ilości, zmienić wymiary albo podzielić zlecenie na partie. Lista nieumieszczonych pozycji to kluczowa kontrola przed cięciem.',
    },
    {
      question: 'Czy narzędzie uwzględnia parametry CNC?',
      answer:
        'Tak, możesz podać parametry technologiczne, które wpływają na dostępną powierzchnię i bezpieczeństwo obróbki. Typowe ustawienia to średnica narzędzia, odstęp bezpieczeństwa i margines od krawędzi płyty. Dzięki temu plan jest bliższy warunkom produkcyjnym.',
    },
    {
      question: 'Jakie dane przygotować przed optymalizacją?',
      answer:
        'Przygotuj format płyty (szerokość i wysokość), listę elementów (szerokość, wysokość, ilość) oraz - jeśli potrzebne - ustawienia CNC. Najlepiej od razu sprawdzić jednostki i spójność wymiarów, bo to najczęstsze źródło błędów w planie rozkroju.',
    },
    {
      question: 'Czy wynik nadaje się do wydruku dla produkcji?',
      answer:
        'Tak, po wyliczeniu układu możesz przejść do widoku drukowania i przygotować czytelny plan dla warsztatu. Przed wydrukiem sprawdź, czy liczba elementów, ich wymiary i ewentualne pozycje nieumieszczone zgadzają się z zamówieniem.',
    },
    {
      question: 'Dlaczego ten sam zestaw elementów czasem daje inny poziom odpadu?',
      answer:
        'Poziom odpadu zmienia się wraz z założeniami: formatem płyty, parametrami technologicznymi i ograniczeniami układu. Nawet mała zmiana marginesu lub odstępu może zmniejszyć liczbę możliwych ułożeń i podnieść odpad procentowy.',
    },
    {
      question: 'Kiedy warto porównać kilka wariantów rozkroju?',
      answer:
        'Warto to robić zawsze przy większych zleceniach lub gdy wynik zawiera elementy nieumieszczone. Porównanie 2-3 wariantów ustawień pomaga znaleźć lepszy kompromis między odpadem, czytelnością układu i wygodą realizacji na produkcji.',
    },
  ] as FaqItem[],
}
