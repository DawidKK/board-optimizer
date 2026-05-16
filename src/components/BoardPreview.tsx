import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getRowColor } from '@/optimizer/rowColors'
import type { Board, PackResult } from '../optimizer/types'

type BoardPreviewProps = {
  board: Board
  result: PackResult | null
}

export function BoardPreview({ board, result }: BoardPreviewProps) {
  const canDraw = board.width > 0 && board.height > 0
  const viewWidth = Math.max(1, board.width)
  const viewHeight = Math.max(1, board.height)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Podgląd</CardTitle>
        <CardDescription>Wygenerowane rozmieszczenie i podsumowanie odpadów.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!canDraw ? (
          <p className="text-sm text-muted-foreground">
            Wprowadź poprawne wymiary płyty, aby zobaczyć podgląd.
          </p>
        ) : (
          <div className="rounded-lg border border-border bg-muted/20 p-2">
          <svg
            className="h-[min(68vh,560px)] w-full"
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            role="img"
            aria-label="Podgląd rozkładu elementów na płycie"
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
            {(result?.placed ?? []).map((item) => {
              const fill = getRowColor(item.rowNumber)
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
                    x={item.x + item.width / 2}
                    y={item.y + item.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.max(12, Math.min(viewWidth, viewHeight) * 0.03)}
                    fill="#ffffff"
                    fontWeight={700}
                  >
                    {item.itemNumberInRow}
                  </text>
                </g>
              )
            })}
          </svg>
          </div>
        )}

        {result && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md border border-border p-3">
                <p className="text-muted-foreground">Wykorzystana powierzchnia</p>
                <p className="font-medium">{Math.round(result.usedArea)} mm²</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-muted-foreground">Odpad</p>
                <p className="font-medium">
                  {Math.round(result.wasteArea)} mm² ({result.wastePercentage.toFixed(1)}%)
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Umieszczone: {result.placed.length}</Badge>
              <Badge variant={result.unplaced.length > 0 ? 'destructive' : 'outline'}>
                Nieumieszczone: {result.unplaced.length}
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
