"use client";
import { useState } from "react";
import styles from "./counter.module.css";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <section className={styles.root}>
      <span>{count}</span>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
    </section>
  );
}
