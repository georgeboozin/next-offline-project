import type { Metadata } from "next";
import { Counter } from "./counter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CSR",
};

export default async function CSR() {
  return (
    <main className={styles.root}>
      <h1>CSR page</h1>
      <Counter />
    </main>
  );
}
