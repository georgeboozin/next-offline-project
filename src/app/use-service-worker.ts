import { useEffect } from "react";
import { Workbox } from "workbox-window";

export function useServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");
      wb.register().then(() => {
        console.log("sw registered");
      });
    }
  }, []);

  return null;
}
