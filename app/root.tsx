import type { ReactNode } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'

import stylesheet from '../src/index.css?url'

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }]
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
                  ? 'text-primary decoration-primary'
                  : 'text-white/85 decoration-white/65 hover:text-white'
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
                  ? 'text-primary decoration-primary'
                  : 'text-white/85 decoration-white/65 hover:text-white'
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
                  ? 'text-primary decoration-primary'
                  : 'text-white/85 decoration-white/65 hover:text-white'
              }`
            }
          >
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  )
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
  )
}

export default function AppRoot() {
  const location = useLocation()
  const isPrintRoute = location.pathname === '/rozkroj-plyt-meblowych/druk'

  if (isPrintRoute) {
    return <Outlet />
  }

  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Wystąpił nieoczekiwany błąd.'

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <h1 className="text-xl font-semibold">Błąd aplikacji</h1>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </main>
  )
}
