import { useEffect, useRef, type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import ReactGA from "react-ga4";

import stylesheet from "../src/index.css?url";

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }];
}

function AppNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-start gap-6 px-4 py-3 md:px-8">
        <NavLink to="/" className="inline-flex items-center">
          <span className="bg-primary px-3 py-1.5 text-sm font-semibold tracking-[0.18em] text-primary-foreground uppercase">
            PILSEN
          </span>
        </NavLink>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium underline underline-offset-4 transition-colors ${
                isActive
                  ? "text-primary decoration-primary"
                  : "text-white/85 decoration-white/65 hover:text-white"
              }`
            }
          >
            Strona Główna
          </NavLink>
          <NavLink
            to="/rozkroj-plyt-meblowych"
            className={({ isActive }) =>
              `text-sm font-medium underline underline-offset-4 transition-colors ${
                isActive
                  ? "text-primary decoration-primary"
                  : "text-white/85 decoration-white/65 hover:text-white"
              }`
            }
          >
            Rozkrój Płyt Meblowych
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-sm font-medium underline underline-offset-4 transition-colors ${
                isActive
                  ? "text-primary decoration-primary"
                  : "text-white/85 decoration-white/65 hover:text-white"
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/faq/rozkroj-plyt"
            className={({ isActive }) =>
              `text-sm font-medium underline underline-offset-4 transition-colors ${
                isActive
                  ? "text-primary decoration-primary"
                  : "text-white/85 decoration-white/65 hover:text-white"
              }`
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to="/slownik"
            className={({ isActive }) =>
              `text-sm font-medium underline underline-offset-4 transition-colors ${
                isActive
                  ? "text-primary decoration-primary"
                  : "text-white/85 decoration-white/65 hover:text-white"
              }`
            }
          >
            Słownik
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AnalyticsTracker() {
  const location = useLocation();
  const initializedRef = useRef(false);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID as
      | string
      | undefined;

    if (!measurementId) {
      return;
    }

    if (!initializedRef.current) {
      ReactGA.initialize(measurementId);
      initializedRef.current = true;
    }

    ReactGA.send({
      hitType: "pageview",
      page: `${location.pathname}${location.search}${location.hash}`,
      title: document.title,
    });
  }, [location.hash, location.pathname, location.search]);

  return null;
}

export default function AppRoot() {
  const location = useLocation();
  const isPrintRoute = location.pathname === "/rozkroj-plyt-meblowych/druk";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PILSEN",
    url: "https://pilsen.pl",
    logo: "https://pilsen.pl/favicon.svg",
  };

  if (isPrintRoute) {
    return (
      <>
        <AnalyticsTracker />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <AnalyticsTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <AppNavbar />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Wystąpił nieoczekiwany błąd.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <h1 className="text-xl font-semibold">Błąd aplikacji</h1>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </main>
  );
}
