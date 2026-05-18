import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Board } from "../optimizer/types";

type BoardFormProps = {
  board: Board;
  onChange: (next: Board) => void;
};

const parseInputNumber = (value: string) =>
  value === "" ? Number.NaN : Number(value);
const displayInputNumber = (value: number) =>
  Number.isFinite(value) ? value : "";

export function BoardForm({ board, onChange }: BoardFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Płyta</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="board-width">Szerokość (mm)</Label>
          <Input
            id="board-width"
            type="number"
            min={1}
            value={displayInputNumber(board.width)}
            onChange={(event) =>
              onChange({
                ...board,
                width: parseInputNumber(event.target.value),
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="board-height">Wysokość (mm)</Label>
          <Input
            id="board-height"
            type="number"
            min={1}
            value={displayInputNumber(board.height)}
            onChange={(event) =>
              onChange({
                ...board,
                height: parseInputNumber(event.target.value),
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
