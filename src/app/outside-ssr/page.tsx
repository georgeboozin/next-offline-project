import type { Metadata } from "next";

async function getServerSideProps(): Promise<number> {
  const data = new Promise<number>((res) => {
    setTimeout(() => {
      res(Math.random());
    }, 1000);
  });

  return data;
}

export const metadata: Metadata = {
  title: "outside SSR",
};

// export const dynamic = "force-dynamic";
export const revalidate = 10;

export default async function SSR() {
  const number = await getServerSideProps();

  return (
    <main>
      <h1>Outside SSR</h1>
      <h2>Number: {number}</h2>
    </main>
  );
}
