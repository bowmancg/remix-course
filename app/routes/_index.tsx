import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from '../styles/home.css'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>Home Page</h1>
      <p id="cta">
        <Link to="/notes">Notes Page</Link>
      </p>
    </main>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: homeStyles}]
}