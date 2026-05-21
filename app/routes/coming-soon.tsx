import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { CabinetPreview } from "../../src/components/CabinetPreview";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";

const pageTitle = "Wkrótce - Przyszłość produkcji mebli | PILSEN";
const pageDescription =
  "Poznaj nadchodzącą platformę PILSEN: rozkrój płyt meblowych, nesting CNC i komponenty gotowe do produkcji mebli.";
const canonicalUrl = "https://pilsen.pl/coming-soon";
const ogImageUrl = "https://pilsen.pl/favicon.svg";

export const meta: MetaFunction = () => [
  { title: pageTitle },
  { name: "description", content: pageDescription },
  { name: "robots", content: "index,follow" },
  { tagName: "link", rel: "canonical", href: canonicalUrl },
  { property: "og:title", content: pageTitle },
  { property: "og:description", content: pageDescription },
  { property: "og:type", content: "website" },
  { property: "og:url", content: canonicalUrl },
  { property: "og:image", content: ogImageUrl },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: pageTitle },
  { name: "twitter:description", content: pageDescription },
  { name: "twitter:image", content: ogImageUrl },
];

export function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f5] text-[#111418]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,20,24,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,20,24,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -left-28 top-0 h-80 w-80 bg-linear-to-br from-[#ff7a1a]/22 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-5.5rem] h-80 w-80 bg-linear-to-br from-[#7f8b99]/20 to-transparent blur-3xl" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-start gap-14 px-6 pt-10 pb-16 md:px-10 lg:grid-cols-2 lg:pt-14">
        <div className="self-start space-y-7">
          <Badge
            variant="outline"
            className="border-[#d7dde4] bg-white/70 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.28em] uppercase text-[#3f474f]"
          >
            WKRÓTCE
          </Badge>

          <h1 className="max-w-3xl text-5xl leading-tight font-semibold tracking-tight text-[#111418] sm:text-6xl">
            Od projektu kuchni do gotowych elementów CNC.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[#3f474f]">
            Jedna platforma do automatycznego generowania:
          </p>

          <ul className="max-w-2xl list-disc space-y-1 pl-5 text-base leading-relaxed text-[#5b646d] marker:text-primary">
            <li>elementów meblowych,</li>
            <li>nestingu CNC,</li>
            <li>list materiałów,</li>
            <li>komponentów gotowych do produkcji.</li>
          </ul>

          <p className="max-w-2xl text-base leading-relaxed text-[#5b646d]">
            Tworzymy nowoczesne narzędzia dla stolarni, które usprawniają
            produkcję bez skomplikowanego workflow.
          </p>

          <p className="max-w-2xl text-sm leading-relaxed text-[#4e5760]">
            Zobacz{" "}
            <Link
              to="/rozkroj-plyt-meblowych"
              className="font-semibold text-[#ff7a1a] underline underline-offset-4"
            >
              darmowe narzędzie do rozkroju płyt meblowych
            </Link>
            , które pomoże Ci szybko przygotować optymalny układ cięcia.
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              className="h-11 border border-[#ff7a1a] bg-[#ff7a1a] px-6 text-base font-semibold text-white transition-transform duration-200 hover:translate-y-[-1px] hover:bg-[#ea6f17]"
            >
              Dołącz do early access
            </Button>
          </div>
        </div>

        <div className="self-start border border-[#dbe1e7] bg-white/75 p-5 shadow-[0_30px_85px_rgba(17,20,24,0.2)] backdrop-blur-sm">
          <CabinetPreview />
        </div>
      </section>
    </main>
  );
}

export default function ComingSoonRoute() {
  return <ComingSoonPage />;
}
