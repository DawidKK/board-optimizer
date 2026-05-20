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
  const lightInputClass =
    "border-[#cfd7df] bg-white text-[#111418] placeholder:text-[#6b7682] focus-visible:border-[#111418]/35 focus-visible:ring-[#111418]/10";

  return (
    <Card className="border border-[#dbe1e7] bg-white/85 shadow-[0_15px_42px_rgba(17,20,24,0.1)]">
      <CardHeader>
        <CardTitle>Płyta</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="board-width" className="text-[#111418]">
            Szerokość (mm)
          </Label>
          <Input
            id="board-width"
            type="number"
            min={1}
            className={lightInputClass}
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
          <Label htmlFor="board-height" className="text-[#111418]">
            Wysokość (mm)
          </Label>
          <Input
            id="board-height"
            type="number"
            min={1}
            className={lightInputClass}
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
