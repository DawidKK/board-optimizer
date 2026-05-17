import { useMemo, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BoardForm } from './components/BoardForm'
import { BoardPreview } from './components/BoardPreview'
import { ElementsForm } from './components/ElementsForm'
import { packBoard } from './optimizer/packBoard'
import type { Board, ElementInput, PackResult } from './optimizer/types'

const initialBoard: Board = {
  width: 2500,
  height: 1250,
}

const initialElements: ElementInput[] = [
  { id: crypto.randomUUID(), width: 600, height: 400, quantity: 2 },
  { id: crypto.randomUUID(), width: 800, height: 300, quantity: 2 },
  { id: crypto.randomUUID(), width: 450, height: 250, quantity: 3 },
]

function App() {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [elements, setElements] = useState<ElementInput[]>(initialElements)
  const [result, setResult] = useState<PackResult | null>(null)
  const totalItems = useMemo(
    () => elements.reduce((sum, item) => sum + Math.max(0, Math.floor(item.quantity || 0)), 0),
    [elements],
  )

  const handleOptimize = () => {
    setResult(packBoard(board, elements))
  }

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <header className="space-y-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Optymalizacja rozkroju
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Board Optimizer</h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Prosty planer rozkroju dla wielu płyt OSB. Wpisz wymiary, uruchom optymalizację i
            sprawdź rozmieszczenie oraz odpady.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Wiele płyt (1..N)</Badge>
            <Badge variant="outline">Obrót 90° włączony</Badge>
          </div>
        </header>

        <Separator />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
          <BoardForm board={board} onChange={setBoard} />
          <ElementsForm elements={elements} onChange={setElements} />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={handleOptimize}>
              Optymalizuj
            </Button>
            <span className="text-sm text-muted-foreground">
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
                    Wiersz {item.rowNumber}, element {item.itemNumberInRow}: {item.width} x{' '}
                    {item.height} mm
                  </li>
                ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          </div>
          <div>
            <BoardPreview board={board} result={result} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
