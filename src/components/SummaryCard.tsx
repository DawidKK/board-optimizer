import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GRAIN_AXIS_WIDTH } from "@/optimizer/types";
import type { Board, PackResult } from "@/optimizer/types";

type SummaryCardProps = {
  board: Board;
  result: PackResult;
};

export function SummaryCard({ board, result }: SummaryCardProps) {
  const totalElements = result.placed.length + result.unplaced.length;
  const grainDirectionLabel = !board.grainDirectionEnabled
    ? "Wyłączony"
    : board.grainAxis === GRAIN_AXIS_WIDTH
      ? "Wzdłuż szerokości"
      : "Wzdłuż wysokości";

  return (
    <Card className="border border-[#dbe1e7] bg-white/85 shadow-[0_15px_42px_rgba(17,20,24,0.1)]">
      <CardHeader>
        <CardTitle>Podsumowanie</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="[&_th]:text-[#111418] [&_th]:font-semibold [&_tr:hover]:bg-transparent">
            <TableRow>
              <TableHead>Parametr</TableHead>
              <TableHead>Wartość</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_td]:text-[#1f2933]">
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Kerf</TableCell>
              <TableCell>{result.settings.toolDiameter} mm</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Odstęp</TableCell>
              <TableCell>{result.settings.safetySpacing} mm</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Margines</TableCell>
              <TableCell>{result.settings.boardMargin} mm</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Obszar roboczy</TableCell>
              <TableCell>
                {Math.max(0, Math.round(result.usableWidth))} x{" "}
                {Math.max(0, Math.round(result.usableHeight))} mm
              </TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Wykorzystana powierzchnia</TableCell>
              <TableCell>{Math.round(result.usedArea)} mm²</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Odpad</TableCell>
              <TableCell>
                {Math.round(result.wasteArea)} mm² ({result.wastePercentage.toFixed(1)}%)
              </TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Liczba płyt</TableCell>
              <TableCell>{result.boardCount}</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Kierunek usłojenia</TableCell>
              <TableCell>{grainDirectionLabel}</TableCell>
            </TableRow>
            <TableRow className="border-[#e6ebf0] hover:bg-[#f1f4f7]">
              <TableCell>Liczba elementów</TableCell>
              <TableCell>{totalElements}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
