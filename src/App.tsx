import { useMemo, useState } from "react";
import { Link } from "react-router";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BoardForm } from "./components/BoardForm";
import { BoardPreview } from "./components/BoardPreview";
import { CncSettingsForm } from "./components/CncSettingsForm";
import { ElementsForm } from "./components/ElementsForm";
import { packBoard } from "./optimizer/packBoard";
import type {
  Board,
  CncCutSettings,
  ElementInput,
  PackResult,
} from "./optimizer/types";

const initialBoard: Board = {
  width: 2500,
  height: 1250,
};

const initialElements: ElementInput[] = [
  { id: "row-1", width: 600, height: 400, quantity: 2 },
  { id: "row-2", width: 800, height: 300, quantity: 2 },
  { id: "row-3", width: 450, height: 250, quantity: 3 },
];

const initialCncSettings: CncCutSettings = {
  toolDiameter: 6,
  safetySpacing: 1,
  boardMargin: 10,
};

function BoardOptimizerPage() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [cncSettings, setCncSettings] =
    useState<CncCutSettings>(initialCncSettings);
  const [elements, setElements] = useState<ElementInput[]>(initialElements);
  const [result, setResult] = useState<PackResult | null>(null);
  const totalItems = useMemo(
    () =>
      elements.reduce(
        (sum, item) => sum + Math.max(0, Math.floor(item.quantity || 0)),
        0,
      ),
    [elements],
  );

  const handleOptimize = () => {
    setResult(packBoard(board, elements, cncSettings));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 bg-linear-to-br from-primary/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-5.5rem] h-80 w-80 bg-linear-to-br from-[#7f8b99]/20 to-transparent blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <header className="space-y-3">
          <p className="text-xs font-medium tracking-wide text-[#5b646d] uppercase">
            Optymalizacja rozkroju
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111418] md:text-4xl">
            Rozkrój płyt meblowych - Board Optimizer
          </h1>
          <p className="max-w-2xl text-sm text-[#3f474f] md:text-base">
            Program do rozkroju płyt meblowych, który pomaga szybko policzyć
            rozkrój płyt meblowych, sprawdzić rozmieszczenie elementów i
            zmniejszyć odpady materiału.
          </p>
          <p className="max-w-2xl text-sm text-[#4e5760] md:text-base">
            Szukasz praktycznych wskazówek? Przeczytaj{" "}
            <Link
              to="/blog"
              className="font-semibold text-[#ff7a1a] underline underline-offset-4"
            >
              poradniki o optymalizacji cięcia i produkcji mebli
            </Link>
            .
          </p>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#ff7a1a] text-white">Wiele płyt (1..N)</Badge>
            <Badge
              variant="outline"
              className="border-[#d7dde4] bg-white/70 text-[#3f474f]"
            >
              Obrót 90° włączony
            </Badge>
          </div>
        </header>

        <Separator className="bg-[#dbe1e7]" />

        <section className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <BoardForm board={board} onChange={setBoard} />
            <ElementsForm elements={elements} onChange={setElements} />
          </div>
          <CncSettingsForm settings={cncSettings} onChange={setCncSettings} />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={handleOptimize}
              className="border border-[#ff7a1a] bg-[#ff7a1a] text-white hover:bg-[#ea6f17]"
            >
              Optymalizuj
            </Button>
            <span className="text-sm text-[#5b646d]">
              Łączna liczba elementów: {totalItems}
            </span>
          </div>

          {result && result.unplaced.length > 0 && (
            <Alert variant="destructive">
              <TriangleAlert />
              <AlertTitle>Nieumieszczone elementy</AlertTitle>
              <AlertDescription>
                <ul className="list-inside list-disc">
                  {result.unplaced.map((item) => (
                    <li key={item.instanceId}>
                      Wiersz {item.rowNumber}, element {item.itemNumberInRow}:{" "}
                      {item.width} x {item.height} mm
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <BoardPreview board={board} result={result} />
        </section>
      </div>
    </main>
  );
}

export default BoardOptimizerPage;
