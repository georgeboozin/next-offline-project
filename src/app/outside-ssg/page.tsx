import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "outside SSG",
};

export default async function SSG() {
  return (
    <main>
      <h1>Outside SSG page</h1>
    </main>
  );
}
