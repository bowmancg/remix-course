// import { cssBundleHref } from "@remix-run/css-bundle";
// import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import MainNavigation from "../app/components/MainNavigation";

import styles from "./styles/main.css";

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export default function App() {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred.</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className="error">
            <h1>An error occurred.</h1>
            <p>{error.statusText}</p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </main>
          <ScrollRestoration />
          
          <LiveReload />
        </body>
      </html>
    );
  }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
