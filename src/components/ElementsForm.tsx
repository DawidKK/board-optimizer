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
import type { ElementInput } from "../optimizer/types";

type ElementsFormProps = {
  elements: ElementInput[];
  onChange: (next: ElementInput[]) => void;
};

const parseInputNumber = (value: string) =>
  value === "" ? Number.NaN : Number(value);
const displayInputNumber = (value: number) =>
  Number.isFinite(value) ? value : "";
const createElementId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ElementsForm({ elements, onChange }: ElementsFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<ElementInput, "id">>({
    width: 300,
    height: 200,
    quantity: 1,
  });

  const update = (
    id: string,
    key: keyof Omit<ElementInput, "id">,
    value: number,
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
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>Elementy</CardTitle>
        </div>
        <Button type="button" onClick={() => setIsDialogOpen(true)}>
          Dodaj element
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wiersz</TableHead>
              <TableHead>Szerokość</TableHead>
              <TableHead>Wysokość</TableHead>
              <TableHead>Ilość</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.map((item, rowIndex) => (
              <TableRow key={item.id}>
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
                <Label htmlFor="new-width">Szerokość (mm)</Label>
                <Input
                  id="new-width"
                  type="number"
                  min={1}
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
                <Label htmlFor="new-height">Wysokość (mm)</Label>
                <Input
                  id="new-height"
                  type="number"
                  min={1}
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
                <Label htmlFor="new-quantity">Ilość</Label>
                <Input
                  id="new-quantity"
                  type="number"
                  min={1}
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
                <Label>Jednostka</Label>
                <Select defaultValue="mm" disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz jednostkę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Milimetry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Label className="gap-3">
                <Checkbox checked={false} disabled />
                Obrót wyłączony w MVP
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
