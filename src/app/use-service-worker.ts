import { useEffect } from "react";
import { Workbox } from "workbox-window";

export function useServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");
      wb.register().then(() => {
        console.log("sw registered");
      });

      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (
          target, // pushState
          thisArg, // this History
          argArray: [data: any, unused: string, url?: string | URL | null]
        ) => {
          const [, , url] = argArray;
          wb.messageSW({ type: "navigationCache", url });
          return target.apply(thisArg, argArray);
        },
      });

      window.history.replaceState = new Proxy(window.history.replaceState, {
        apply: (
          target, // replaceState
          thisArg, // this History
          argArray: [data: any, unused: string, url?: string | URL | null]
        ) => {
          const [, , url] = argArray;
          wb.messageSW({ type: "navigationCache", url });
          return target.apply(thisArg, argArray);
        },
      });
    }
  }, []);

  return null;
}
