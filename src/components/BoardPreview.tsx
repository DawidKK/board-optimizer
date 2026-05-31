import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRowColor } from "@/optimizer/rowColors";
import { GRAIN_AXIS_WIDTH } from "../optimizer/types";
import type { Board, PackResult } from "../optimizer/types";

type BoardPreviewProps = {
  board: Board;
  result: PackResult | null;
};

export function BoardPreview({ board, result }: BoardPreviewProps) {
  const canDraw = board.width > 0 && board.height > 0;
  const viewWidth = Math.max(1, board.width);
  const viewHeight = Math.max(1, board.height);
  const isAxisX = board.grainAxis === GRAIN_AXIS_WIDTH;

  return (
    <Card className="h-full border border-[#dbe1e7] bg-white/85 shadow-[0_15px_42px_rgba(17,20,24,0.1)]">
      <CardHeader>
        <CardTitle>Podgląd</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!canDraw ? (
          <p className="text-sm text-muted-foreground">
            Wprowadź poprawne wymiary płyty, aby zobaczyć podgląd.
          </p>
        ) : (
          <div className="space-y-4">
            {(result?.boards ?? []).map((boardLayout) => (
              <div
                key={boardLayout.boardIndex}
                className="rounded-lg border border-border bg-white p-2"
              >
                <p className="mb-1 text-sm font-medium text-[#111418]">
                  Płyta {boardLayout.boardIndex + 1}
                </p>
                {board.grainDirectionEnabled && (
                  <div className="mb-2 flex flex-wrap items-center gap-2 rounded-md border border-[#dbe1e7] bg-white px-3 py-2 text-xs text-[#334155]">
                    <svg
                      className="size-12 rounded-sm border border-[#64748b]"
                      viewBox="0 0 44 44"
                      aria-hidden="true"
                    >
                      <rect x={0} y={0} width={44} height={44} fill="#0b1220" />
                      {isAxisX ? (
                        <>
                          <line x1={4} y1={8} x2={40} y2={8} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={4} y1={17} x2={40} y2={17} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={4} y1={26} x2={40} y2={26} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={4} y1={35} x2={40} y2={35} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                        </>
                      ) : (
                        <>
                          <line x1={8} y1={4} x2={8} y2={40} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={17} y1={4} x2={17} y2={40} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={26} y1={4} x2={26} y2={40} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                          <line x1={35} y1={4} x2={35} y2={40} stroke="rgba(148, 163, 184, 0.7)" strokeWidth={1.6} strokeDasharray="4 4" />
                        </>
                      )}
                    </svg>
                    <span className="font-medium text-[#334155]">
                      - Kierunek usłojenia:{" "}
                      {board.grainAxis === GRAIN_AXIS_WIDTH ? "wzdłuż szerokości" : "wzdłuż wysokości"}
                    </span>
                  </div>
                )}
                <svg
                  className="h-[min(68vh,560px)] w-full"
                  viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                  role="img"
                  aria-label={`Podgląd rozkładu elementów na płycie ${boardLayout.boardIndex + 1}`}
                >
                  <defs>
                    <pattern
                      id={`grain-board-${boardLayout.boardIndex}`}
                      width={44}
                      height={44}
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1={isAxisX ? 4 : 22}
                        y1={isAxisX ? 22 : 4}
                        x2={isAxisX ? 40 : 22}
                        y2={isAxisX ? 22 : 40}
                        stroke="rgba(148, 163, 184, 0.38)"
                        strokeWidth={2.2}
                      />
                    </pattern>
                    <pattern
                      id={`grain-part-${boardLayout.boardIndex}`}
                      width={28}
                      height={28}
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1={isAxisX ? 3 : 14}
                        y1={isAxisX ? 14 : 3}
                        x2={isAxisX ? 25 : 14}
                        y2={isAxisX ? 14 : 25}
                        stroke="rgba(15, 23, 42, 0.32)"
                        strokeWidth={1.8}
                      />
                    </pattern>
                  </defs>
                  <rect
                    x={0}
                    y={0}
                    width={board.width}
                    height={board.height}
                    fill="#0b1220"
                    stroke="#475569"
                    strokeWidth={Math.max(viewWidth, viewHeight) * 0.005}
                  />
                  {board.grainDirectionEnabled && (
                    <>
                      <rect
                        x={0}
                        y={0}
                        width={board.width}
                        height={board.height}
                        fill={`url(#grain-board-${boardLayout.boardIndex})`}
                        pointerEvents="none"
                      />
                      <text
                        x={Math.max(20, board.width * 0.02)}
                        y={Math.max(24, board.height * 0.03)}
                        fill="rgba(226, 232, 240, 0.85)"
                        fontSize={Math.max(10, Math.min(viewWidth, viewHeight) * 0.014)}
                        fontWeight={600}
                      >
                        {`Słoje: ${isAxisX ? "szerokość →" : "wysokość ↓"}`}
                      </text>
                    </>
                  )}
                  {boardLayout.placed.map((item) => {
                    const fill = getRowColor(item.rowNumber);
                    const topLabelY = item.y + 14;
                    const leftLabelX = item.x + 6;
                    const leftLabelY = item.y + item.height / 2;
                    const dimensionFontSize = Math.max(
                      9,
                      Math.min(viewWidth, viewHeight) * 0.016,
                    ) * 3;
                    return (
                      <g key={item.instanceId}>
                        <rect
                          x={item.x}
                          y={item.y}
                          width={item.width}
                          height={item.height}
                          fill={fill}
                          fillOpacity={0.8}
                          stroke="#020617"
                          strokeWidth={Math.max(viewWidth, viewHeight) * 0.002}
                        />
                        {board.grainDirectionEnabled && (
                          <>
                            <rect
                              x={item.x}
                              y={item.y}
                              width={item.width}
                              height={item.height}
                              fill={`url(#grain-part-${boardLayout.boardIndex})`}
                              pointerEvents="none"
                            />
                            <path
                              d={
                                isAxisX
                                  ? `M ${item.x + 6} ${item.y + 8} L ${item.x + 22} ${item.y + 8} M ${item.x + 22} ${item.y + 8} L ${item.x + 18} ${item.y + 5} M ${item.x + 22} ${item.y + 8} L ${item.x + 18} ${item.y + 11}`
                                  : `M ${item.x + 8} ${item.y + 6} L ${item.x + 8} ${item.y + 22} M ${item.x + 8} ${item.y + 22} L ${item.x + 5} ${item.y + 18} M ${item.x + 8} ${item.y + 22} L ${item.x + 11} ${item.y + 18}`
                              }
                              stroke="rgba(15, 23, 42, 0.7)"
                              strokeWidth={1}
                              fill="none"
                              pointerEvents="none"
                            />
                          </>
                        )}
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
                          fontSize={Math.max(
                            10,
                            Math.min(viewWidth, viewHeight) * 0.022,
                          )}
                          fill="#ffffff"
                          fontWeight={700}
                        >
                          {item.itemNumberInRow}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                  <div className="rounded-md border border-border p-2 text-[#111418]">
                    <p className="text-[#5f6b77]">
                      Wykorzystana powierzchnia (CNC)
                    </p>
                    <p className="font-medium text-[#111418]">
                      {Math.round(boardLayout.usedArea)} mm²
                    </p>
                  </div>
                  <div className="rounded-md border border-border p-2 text-[#111418]">
                    <p className="text-[#5f6b77]">
                      Odpad (obszar roboczy)
                    </p>
                    <p className="font-medium text-[#111418]">
                      {Math.round(boardLayout.wasteArea)} mm²
                    </p>
                  </div>
                  <div className="rounded-md border border-border p-2 text-[#111418]">
                    <p className="text-[#5f6b77]">Odpad (%)</p>
                    <p className="font-medium text-[#111418]">
                      {boardLayout.wastePercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </CardContent>
    </Card>
  );
}
