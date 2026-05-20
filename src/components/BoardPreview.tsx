import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRowColor } from "@/optimizer/rowColors";
import type { Board, PackResult } from "../optimizer/types";

type BoardPreviewProps = {
  board: Board;
  result: PackResult | null;
};

export function BoardPreview({ board, result }: BoardPreviewProps) {
  const canDraw = board.width > 0 && board.height > 0;
  const viewWidth = Math.max(1, board.width);
  const viewHeight = Math.max(1, board.height);

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
                <svg
                  className="h-[min(68vh,560px)] w-full"
                  viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                  role="img"
                  aria-label={`Podgląd rozkładu elementów na płycie ${boardLayout.boardIndex + 1}`}
                >
                  <rect
                    x={0}
                    y={0}
                    width={board.width}
                    height={board.height}
                    fill="#0b1220"
                    stroke="#475569"
                    strokeWidth={Math.max(viewWidth, viewHeight) * 0.005}
                  />
                  {boardLayout.placed.map((item) => {
                    const fill = getRowColor(item.rowNumber);
                    const topLabelY = item.y + 14;
                    const leftLabelX = item.x + 6;
                    const leftLabelY = item.y + item.height / 2;
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
                        <text
                          x={leftLabelX}
                          y={leftLabelY}
                          textAnchor="start"
                          dominantBaseline="middle"
                          fontSize={Math.max(
                            9,
                            Math.min(viewWidth, viewHeight) * 0.016,
                          )}
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
                          fontSize={Math.max(
                            9,
                            Math.min(viewWidth, viewHeight) * 0.016,
                          )}
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
