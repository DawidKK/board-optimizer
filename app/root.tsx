import type { ReactNode } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import stylesheet from '../src/index.css?url'

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }]
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
  return <Outlet />
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
