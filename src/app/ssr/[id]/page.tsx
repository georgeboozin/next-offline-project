import type { Metadata } from "next";
import styles from "./page.module.css";

async function getServerSideProps(id: string): Promise<string> {
  const data = new Promise<string>((res) => {
    setTimeout(() => {
      res(id);
    }, 1000);
  });
  return data;
}

export const metadata: Metadata = {
  title: "SSR - dynamic route",
};

export default async function SSR({ params }: { params: { id: string } }) {
  const id = await getServerSideProps(params.id);
  return (
    <main className={styles.root}>
      <h1>SSR</h1>
      <h2>ID: {id}</h2>
    </main>
  );
}
