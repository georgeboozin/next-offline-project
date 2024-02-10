import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SSG",
};

export default async function SSG() {
  return (
    <main className={styles.root}>
      <h1>SSG page</h1>
    </main>
  );
}
