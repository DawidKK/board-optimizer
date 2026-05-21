import { useState, type ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BoardForm } from "./components/BoardForm";
import { BoardPreview } from "./components/BoardPreview";
import { CncSettingsForm } from "./components/CncSettingsForm";
import { ElementsForm } from "./components/ElementsForm";
import { SummaryCard } from "./components/SummaryCard";
import { packBoard } from "./optimizer/packBoard";
import type {
  Board,
  CncCutSettings,
  ElementInput,
  PackResult,
} from "./optimizer/types";
import { GRAIN_AXIS_HEIGHT, GRAIN_AXIS_WIDTH } from "./optimizer/types";

const PRINT_STORAGE_KEY = "board-optimizer-print-payload";

const initialBoard: Board = {
  width: 2500,
  height: 1250,
  grainDirectionEnabled: false,
  grainAxis: GRAIN_AXIS_HEIGHT,
};

const initialElements: ElementInput[] = [
  { id: "row-1", width: 600, height: 400, quantity: 2, canRotate: true },
  { id: "row-2", width: 800, height: 300, quantity: 2, canRotate: true },
  { id: "row-3", width: 450, height: 250, quantity: 3, canRotate: true },
];

const initialCncSettings: CncCutSettings = {
  toolDiameter: 6,
  safetySpacing: 1,
  boardMargin: 10,
};

type BoardOptimizerPageProps = {
  prelude?: ReactNode;
};

function BoardOptimizerPage({ prelude }: BoardOptimizerPageProps) {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [cncSettings, setCncSettings] =
    useState<CncCutSettings>(initialCncSettings);
  const [elements, setElements] = useState<ElementInput[]>(initialElements);
  const [result, setResult] = useState<PackResult | null>(null);

  const handleBoardChange = (next: Board) => {
    if (next.grainDirectionEnabled && !board.grainDirectionEnabled) {
      setElements((current) => current.map((item) => ({ ...item, canRotate: false })));
    }
    setBoard(next);
  };

  const handleOptimize = () => {
    setResult(packBoard(board, elements, cncSettings));
  };

  const handleOpenPrintPreview = () => {
    if (!result || typeof window === "undefined") return;

    window.localStorage.setItem(
      PRINT_STORAGE_KEY,
      JSON.stringify({ board, result }),
    );
    window.open(
      "/rozkroj-plyt-meblowych/druk",
      "_blank",
      "noopener,noreferrer",
    );
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
      <div className="pointer-events-none absolute -left-28 top-0 h-80 w-80 bg-linear-to-br from-[#ff7a1a]/22 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-5.5rem] h-80 w-80 bg-linear-to-br from-[#7f8b99]/20 to-transparent blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111418] md:text-4xl">
            Rozkrój płyt meblowych
          </h1>
        </header>

        <Separator className="bg-[#dbe1e7]" />

        <section className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <BoardForm board={board} onChange={handleBoardChange} />
            <ElementsForm
              elements={elements}
              onChange={setElements}
              grainDirectionEnabled={board.grainDirectionEnabled}
              grainAxis={board.grainAxis}
              onGrainAxisChange={(axis) =>
                handleBoardChange({ ...board, grainAxis: axis })
              }
              onGrainDirectionEnabledChange={(enabled) =>
                handleBoardChange({ ...board, grainDirectionEnabled: enabled })
              }
            />
          </div>
          <CncSettingsForm settings={cncSettings} onChange={setCncSettings} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              onClick={handleOptimize}
              size="lg"
              className="min-w-36 border border-[#ff7a1a] bg-[#ff7a1a] px-6 py-2.5 text-base text-white hover:bg-[#ea6f17]"
            >
              Optymalizuj
            </Button>
            <Button
              type="button"
              onClick={handleOpenPrintPreview}
              disabled={!result}
              size="lg"
              className="min-w-36 border border-[#ff7a1a] bg-[#ff7a1a] px-6 py-2.5 text-base text-white hover:bg-[#ea6f17]"
            >
              Drukuj
            </Button>
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
                      {board.grainDirectionEnabled &&
                        result.grainBlockedUnplacedIds.includes(item.instanceId) && (
                        <>. Element nie mieści się na płycie przy zachowaniu kierunku usłojenia ({board.grainAxis === GRAIN_AXIS_WIDTH ? "wzdłuż szerokości" : "wzdłuż wysokości"}).</>
                      )}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <BoardPreview board={board} result={result} />
          {result && <SummaryCard board={board} result={result} />}
          {prelude}
        </section>
      </div>
    </main>
  );
}

export default BoardOptimizerPage;
