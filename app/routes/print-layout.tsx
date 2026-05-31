import { useState } from "react";
import type { MetaFunction } from "react-router";
import type { Board, PackResult } from "../../src/optimizer/types";

type PrintPayload = {
  board: Board;
  result: PackResult;
};

const PRINT_STORAGE_KEY = "board-optimizer-print-payload";
const patternIds = [
  "diag",
  "diag-rev",
  "h-lines",
  "v-lines",
  "dots",
  "cross",
  "grid",
  "dense",
];

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
      <defs>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-diag`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="20" fill="#f7f7f7" />
          <path
            d="M-5 5 L5 -5 M0 20 L20 0 M15 25 L25 15"
            stroke="#222222"
            strokeWidth="2.4"
          />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-diag-rev`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="20" fill="#f7f7f7" />
          <path
            d="M15 -5 L25 5 M0 0 L20 20 M-5 15 L5 25"
            stroke="#222222"
            strokeWidth="2.4"
          />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-h-lines`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="18" fill="#f7f7f7" />
          <line
            x1="0"
            y1="4"
            x2="18"
            y2="4"
            stroke="#222222"
            strokeWidth="2.2"
          />
          <line
            x1="0"
            y1="13"
            x2="18"
            y2="13"
            stroke="#222222"
            strokeWidth="2.2"
          />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-v-lines`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="18" fill="#f7f7f7" />
          <line
            x1="4"
            y1="0"
            x2="4"
            y2="18"
            stroke="#222222"
            strokeWidth="2.2"
          />
          <line
            x1="13"
            y1="0"
            x2="13"
            y2="18"
            stroke="#222222"
            strokeWidth="2.2"
          />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-dots`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="20" fill="#f7f7f7" />
          <circle cx="5" cy="5" r="2.8" fill="#222222" />
          <circle cx="15" cy="15" r="2.8" fill="#222222" />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-cross`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="18" fill="#f7f7f7" />
          <line
            x1="9"
            y1="0"
            x2="9"
            y2="18"
            stroke="#222222"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="9"
            x2="18"
            y2="9"
            stroke="#222222"
            strokeWidth="2"
          />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-grid`}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <rect width="22" height="22" fill="#f7f7f7" />
          <path d="M0 0H22V22H0Z" fill="none" stroke="#222222" strokeWidth="1.8" />
        </pattern>
        <pattern
          id={`print-pattern-${boardLayout.boardIndex}-dense`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <rect width="14" height="14" fill="#f7f7f7" />
          <line
            x1="0"
            y1="3"
            x2="14"
            y2="3"
            stroke="#222222"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="10"
            x2="14"
            y2="10"
            stroke="#222222"
            strokeWidth="1.5"
          />
          <line
            x1="3"
            y1="0"
            x2="3"
            y2="14"
            stroke="#222222"
            strokeWidth="1.5"
          />
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="14"
            stroke="#222222"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>

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
        const patternName =
          patternIds[(Math.max(1, item.rowNumber) - 1) % patternIds.length];
        const fill = `url(#print-pattern-${boardLayout.boardIndex}-${patternName})`;
        const topLabelY = item.y + 14;
        const leftLabelX = item.x + 6;
        const leftLabelY = item.y + item.height / 2;
        const dimensionFontSize =
          Math.max(9, Math.min(viewWidth, viewHeight) * 0.016) * 3;

        return (
          <g key={item.instanceId}>
            <rect
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill={fill}
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
              {`${Math.round(item.height)} mm`}
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
              {`${Math.round(item.width)} mm`}
            </text>
            <text
              x={item.x + item.width / 2}
              y={item.y + item.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.max(10, Math.min(viewWidth, viewHeight) * 0.022) * 3}
              fill="#111111"
              stroke="#ffffff"
              strokeWidth={Math.max(viewWidth, viewHeight) * 0.0014}
              paintOrder="stroke"
              fontWeight={700}
            >
              {item.itemNumberInRow}
            </text>
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
