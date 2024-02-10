import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <main>
      <h1>Main Page</h1>
      <ul className={styles.outLinks}>
        <li>
          <Link href="/outside-ssg">Outside SSG</Link>
        </li>
        <li>
          <Link href="/outside-ssr">Outside SSR</Link>
        </li>
      </ul>
    </main>
  );
}
