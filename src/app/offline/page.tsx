import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return (
    <main>
      <h1>Offline fallback page</h1>
    </main>
  );
}
