import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

async function getServerSideProps(): Promise<number> {
  const data = new Promise<number>((res) => {
    setTimeout(() => {
      res(Math.random());
    }, 1000);
  });

  return data;
}

export const metadata: Metadata = {
  title: "SSR",
};

export const revalidate = 10;

export default async function SSR() {
  const number = await getServerSideProps();

  return (
    <main className={styles.root}>
      <h1>SSR</h1>
      <h2>Number: {number}</h2>
    </main>
  );
}
