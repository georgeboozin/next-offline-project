import { useEffect } from "react";

export function useServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // TODO: add sw.js
    }
  }, []);

  return null;
}
