import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import type { CncCutSettings } from "@/optimizer/types";

type CncSettingsFormProps = {
  settings: CncCutSettings;
  onChange: (next: CncCutSettings) => void;
};

const parseInputNumber = (value: string) =>
  value === "" ? Number.NaN : Number(value);
const displayInputNumber = (value: number) =>
  Number.isFinite(value) ? value : "";

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="inline-flex size-4 items-center justify-center rounded-full border border-[var(--ds-main-color)] text-[var(--ds-main-color)] outline-none transition-colors hover:opacity-85 focus-visible:opacity-85"
        aria-label="Informacja"
      >
        <Info className="size-3" />
      </button>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-64 -translate-x-1/2 rounded-md border border-[#dbe1e7] bg-white px-3 py-2 text-xs leading-relaxed text-[#2f3a44] opacity-0 shadow-[0_10px_28px_rgba(17,20,24,0.14)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        {text}
      </span>
    </span>
  );
}

export function CncSettingsForm({ settings, onChange }: CncSettingsFormProps) {
  const lightInputClass =
    "border-[#cfd7df] bg-white text-[#111418] placeholder:text-[#6b7682] focus-visible:border-[#111418]/35 focus-visible:ring-[#111418]/10";

  return (
    <Card className="border border-[#dbe1e7] bg-white/85 shadow-[0_15px_42px_rgba(17,20,24,0.1)]">
      <CardHeader>
        <CardTitle>Ustawienia CNC</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label
            htmlFor="tool-diameter"
            className="flex items-center gap-2 text-[#111418]"
          >
            Średnica frezu / kerf (mm)
            <InfoTooltip text="To średnica narzędzia tnącego, która wyznacza szerokość rzazu. Im większa średnica, tym więcej miejsca potrzeba między elementami." />
          </Label>
          <Input
            id="tool-diameter"
            type="number"
            min={0.1}
            step={0.1}
            className={lightInputClass}
            value={displayInputNumber(settings.toolDiameter)}
            onChange={(event) =>
              onChange({
                ...settings,
                toolDiameter: parseInputNumber(event.target.value),
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="safety-spacing"
            className="flex items-center gap-2 text-[#111418]"
          >
            Dodatkowy odstęp (mm)
            <InfoTooltip text="Dodatkowy luz technologiczny ponad sam kerf, np. na drgania lub tolerancję obróbki. Większa wartość zwiększa bezpieczeństwo, ale może zmniejszyć liczbę elementów na płycie." />
          </Label>
          <Input
            id="safety-spacing"
            type="number"
            min={0}
            step={0.1}
            className={lightInputClass}
            value={displayInputNumber(settings.safetySpacing)}
            onChange={(event) =>
              onChange({
                ...settings,
                safetySpacing: parseInputNumber(event.target.value),
              })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="board-margin"
            className="flex items-center gap-2 text-[#111418]"
          >
            Margines płyty (mm)
            <InfoTooltip text="Minimalna odległość elementów od krawędzi płyty. Większy margines poprawia bezpieczeństwo pracy na CNC, ale zmniejsza użyteczny obszar nestingu." />
          </Label>
          <Input
            id="board-margin"
            type="number"
            min={0}
            step={0.5}
            className={lightInputClass}
            value={displayInputNumber(settings.boardMargin)}
            onChange={(event) =>
              onChange({
                ...settings,
                boardMargin: parseInputNumber(event.target.value),
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
