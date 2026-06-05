import { useState } from "react";
import type { MetaFunction } from "react-router";
import type { Board, PackResult } from "../../src/optimizer/types";

type PrintPayload = {
  board: Board;
  result: PackResult;
};

const PRINT_STORAGE_KEY = "board-optimizer-print-payload";

export const meta: MetaFunction = () => [
  { title: "Wydruk rozkroju - Board Optimizer" },
  { name: "robots", content: "noindex,nofollow" },
];

function readPrintPayload() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PRINT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PrintPayload;
    if (!parsed?.board || !parsed?.result) return null;
    return parsed;
  } catch {
    return null;
  }
}

function BoardPrintSvg({
  board,
  boardLayout,
}: {
  board: Board;
  boardLayout: PackResult["boards"][number];
}) {
  const viewWidth = Math.max(1, board.width);
  const viewHeight = Math.max(1, board.height);

  return (
    <svg
      className="print-board-svg w-full max-w-[1200px] border border-[#111111] print:max-w-none"
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      role="img"
      aria-label={`Podglad rozkladu elementow na plycie ${boardLayout.boardIndex + 1}`}
    >
      <rect
        x={0}
        y={0}
        width={board.width}
        height={board.height}
        fill="#ffffff"
        stroke="#111111"
        strokeWidth={Math.max(viewWidth, viewHeight) * 0.005}
      />

      {boardLayout.placed.map((item) => {
        const topLabelY = item.y + 38;
        const leftLabelX = item.x + 6;
        const leftLabelY = item.y + item.height / 2;
        const dimensionFontSize =
          Math.max(9, Math.min(viewWidth, viewHeight) * 0.016) * 3;
        const description = (item.description ?? "").trim();
        const descriptionFontSize = dimensionFontSize * 0.65;
        const descriptionY =
          item.y + item.height - Math.max(8, descriptionFontSize * 0.7);

        return (
          <g key={item.instanceId}>
            <rect
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill="none"
              stroke="#020617"
              strokeWidth={Math.max(viewWidth, viewHeight) * 0.002}
            />
            <text
              x={leftLabelX}
              y={leftLabelY}
              textAnchor="start"
              dominantBaseline="middle"
              fontSize={dimensionFontSize}
              fill="#000000"
              fontWeight={700}
            >
              {Math.round(item.height)}
            </text>
            <text
              x={item.x + item.width / 2}
              y={topLabelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={dimensionFontSize}
              fill="#000000"
              fontWeight={700}
            >
              {Math.round(item.width)}
            </text>
            {description && (
              <text
                x={item.x + item.width / 2}
                y={descriptionY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={descriptionFontSize}
                fill="#000000"
                fontWeight={700}
              >
                {description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function PrintLayoutRoute() {
  const [payload] = useState<PrintPayload | null>(readPrintPayload);

  if (!payload) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 text-black">
        <p className="text-base">
          Brak danych do wydruku. Najpierw uruchom optymalizacje i kliknij
          przycisk Drukuj.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6 text-black print:p-0">
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          html,
          body {
            background: #ffffff !important;
          }

          .print-board-page {
            box-sizing: border-box;
            break-after: page;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            gap: 4mm;
            width: 277mm;
            height: 190mm;
            overflow: hidden;
          }

          .print-board-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          .print-board-canvas {
            flex: 1 1 auto;
            min-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .print-board-svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1280px] space-y-6 print:max-w-none print:space-y-0">
        <div className="flex items-center justify-between print:hidden">
          <h1 className="text-xl font-semibold">Podglad do druku</h1>
          <button
            type="button"
            className="rounded border border-[#ff7a1a] bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea6f17]"
            onClick={() => window.print()}
          >
            Drukuj / Zapisz do PDF
          </button>
        </div>

        {payload.result.boards.map((boardLayout) => (
          <section
            key={boardLayout.boardIndex}
            className="print-board-page space-y-2 break-inside-avoid print:break-inside-avoid"
          >
            <div className="flex items-end justify-between gap-4 text-sm font-semibold">
              <p>Plyta {boardLayout.boardIndex + 1}</p>
              <p className="text-xs font-medium">
                {payload.board.width} x {payload.board.height} mm
              </p>
            </div>
            <div className="print-board-canvas">
              <BoardPrintSvg board={payload.board} boardLayout={boardLayout} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
