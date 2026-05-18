import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CncCutSettings } from "@/optimizer/types";

type CncSettingsFormProps = {
  settings: CncCutSettings;
  onChange: (next: CncCutSettings) => void;
};

const parseInputNumber = (value: string) =>
  value === "" ? Number.NaN : Number(value);
const displayInputNumber = (value: number) =>
  Number.isFinite(value) ? value : "";

export function CncSettingsForm({ settings, onChange }: CncSettingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia CNC</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="tool-diameter">Średnica frezu / kerf (mm)</Label>
          <Input
            id="tool-diameter"
            type="number"
            min={0.1}
            step={0.1}
            value={displayInputNumber(settings.toolDiameter)}
            onChange={(event) =>
              onChange({
                ...settings,
                toolDiameter: parseInputNumber(event.target.value),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            To średnica narzędzia tnącego, która wyznacza szerokość rzazu. Im
            większa średnica, tym więcej miejsca potrzeba między elementami.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="safety-spacing">Dodatkowy odstęp (mm)</Label>
          <Input
            id="safety-spacing"
            type="number"
            min={0}
            step={0.1}
            value={displayInputNumber(settings.safetySpacing)}
            onChange={(event) =>
              onChange({
                ...settings,
                safetySpacing: parseInputNumber(event.target.value),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Dodatkowy luz technologiczny ponad sam kerf, np. na drgania lub
            tolerancję obróbki. Większa wartość zwiększa bezpieczeństwo, ale
            może zmniejszyć liczbę elementów na płycie.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="board-margin">Margines płyty (mm)</Label>
          <Input
            id="board-margin"
            type="number"
            min={0}
            step={0.5}
            value={displayInputNumber(settings.boardMargin)}
            onChange={(event) =>
              onChange({
                ...settings,
                boardMargin: parseInputNumber(event.target.value),
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Minimalna odległość elementów od krawędzi płyty. Większy margines
            poprawia bezpieczeństwo pracy na CNC, ale zmniejsza użyteczny obszar
            nestingu.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
