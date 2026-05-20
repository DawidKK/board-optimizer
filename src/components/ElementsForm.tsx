import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRowColor } from "@/optimizer/rowColors";
import type { Board, ElementInput } from "../optimizer/types";

type ElementsFormProps = {
  elements: ElementInput[];
  onChange: (next: ElementInput[]) => void;
  grainDirectionEnabled: boolean;
  grainAxis: Board["grainAxis"];
  onGrainAxisChange: (axis: Board["grainAxis"]) => void;
  onGrainDirectionEnabledChange: (enabled: boolean) => void;
};

const parseInputNumber = (value: string) =>
  value === "" ? Number.NaN : Number(value);
const displayInputNumber = (value: number) =>
  Number.isFinite(value) ? value : "";
const createElementId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ElementsForm({
  elements,
  onChange,
  grainDirectionEnabled,
  grainAxis,
  onGrainAxisChange,
  onGrainDirectionEnabledChange,
}: ElementsFormProps) {
  const lightInputClass =
    "border-[#cfd7df] bg-white text-[#111418] placeholder:text-[#6b7682] focus-visible:border-[#111418]/35 focus-visible:ring-[#111418]/10";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<ElementInput, "id">>({
    width: 300,
    height: 200,
    quantity: 1,
    canRotate: !grainDirectionEnabled,
  });

  const update = (
    id: string,
    key: keyof Omit<ElementInput, "id">,
    value: number | boolean,
  ) => {
    onChange(
      elements.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
  };

  const remove = (id: string) =>
    onChange(elements.filter((item) => item.id !== id));

  const add = () =>
    onChange([...elements, { id: createElementId(), ...draft }]);

  return (
    <Card className="border border-[#dbe1e7] bg-white/85 shadow-[0_15px_42px_rgba(17,20,24,0.1)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>Elementy</CardTitle>
        </div>
        <Button type="button" onClick={() => setIsDialogOpen(true)}>
          Dodaj element
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label className="inline-flex items-center gap-3 text-[#111418]">
          <Checkbox
            checked={grainDirectionEnabled}
            onCheckedChange={(checked) =>
              onGrainDirectionEnabledChange(checked === true)
            }
          />
          Zachowaj kierunek usłojenia
        </Label>
        {grainDirectionEnabled && (
          <div className="rounded-md border border-[#dbe1e7] bg-[#f8fafc] p-3">
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label className="text-[#111418]">Kierunek usłojenia</Label>
                <Select
                  value={grainAxis}
                  onValueChange={(value) =>
                    onGrainAxisChange(value as Board["grainAxis"])
                  }
                >
                  <SelectTrigger className="w-full border-[#cfd7df] bg-white text-[#111418]">
                    <SelectValue placeholder="Wybierz kierunek usłojenia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Szerokość (wzdłuż płyty)">
                      Szerokość (wzdłuż płyty)
                    </SelectItem>
                    <SelectItem value="Wysokość (wzdłuż płyty)">
                      Wysokość (wzdłuż płyty)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        <Table>
          <TableHeader className="[&_th]:text-[#111418] [&_th]:font-semibold [&_tr:hover]:bg-transparent">
            <TableRow>
              <TableHead>Wiersz</TableHead>
              <TableHead>
                Szerokość{" "}
                {grainDirectionEnabled
                  ? grainAxis === "x"
                    ? "(‖ słoje)"
                    : "(⊥ słoje)"
                  : ""}
              </TableHead>
              <TableHead>
                Wysokość{" "}
                {grainDirectionEnabled
                  ? grainAxis === "y"
                    ? "(‖ słoje)"
                    : "(⊥ słoje)"
                  : ""}
              </TableHead>
              <TableHead>Ilość</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_td]:text-[#1f2933]">
            {elements.map((item, rowIndex) => (
              <TableRow
                key={item.id}
                className="border-[#e6ebf0] hover:bg-[#f1f4f7]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-3 rounded-full"
                      style={{ backgroundColor: getRowColor(rowIndex + 1) }}
                    />
                    <span className="font-medium">{rowIndex + 1}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    className={lightInputClass}
                    value={displayInputNumber(item.width)}
                    onChange={(event) =>
                      update(
                        item.id,
                        "width",
                        parseInputNumber(event.target.value),
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    className={lightInputClass}
                    value={displayInputNumber(item.height)}
                    onChange={(event) =>
                      update(
                        item.id,
                        "height",
                        parseInputNumber(event.target.value),
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={1}
                    className={lightInputClass}
                    value={displayInputNumber(item.quantity)}
                    onChange={(event) =>
                      update(
                        item.id,
                        "quantity",
                        parseInputNumber(event.target.value),
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(item.id)}
                  >
                    Usuń
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj element</DialogTitle>
              <DialogDescription>
                Wprowadź wymiary nowego prostokątnego elementu.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-1">
              <div className="grid gap-2">
                <Label htmlFor="new-width" className="text-[#111418]">
                  Szerokość (mm)
                </Label>
                <Input
                  id="new-width"
                  type="number"
                  min={1}
                  className={lightInputClass}
                  value={displayInputNumber(draft.width)}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      width: parseInputNumber(event.target.value),
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-height" className="text-[#111418]">
                  Wysokość (mm)
                </Label>
                <Input
                  id="new-height"
                  type="number"
                  min={1}
                  className={lightInputClass}
                  value={displayInputNumber(draft.height)}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      height: parseInputNumber(event.target.value),
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-quantity" className="text-[#111418]">
                  Ilość
                </Label>
                <Input
                  id="new-quantity"
                  type="number"
                  min={1}
                  className={lightInputClass}
                  value={displayInputNumber(draft.quantity)}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      quantity: parseInputNumber(event.target.value),
                    }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-[#111418]">Jednostka</Label>
                <Select defaultValue="mm" disabled>
                  <SelectTrigger className="w-full border-[#cfd7df] bg-white text-[#111418]">
                    <SelectValue placeholder="Wybierz jednostkę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Milimetry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Label className="gap-3 text-[#111418]">
                <Checkbox
                  checked={draft.canRotate ?? !grainDirectionEnabled}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({
                      ...current,
                      canRotate: checked === true,
                    }))
                  }
                />
                Można obracać
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Anuluj
              </Button>
              <Button
                type="button"
                onClick={() => {
                  add();
                  setDraft((current) => ({
                    ...current,
                    canRotate: !grainDirectionEnabled,
                  }));
                  setIsDialogOpen(false);
                }}
              >
                Dodaj
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
