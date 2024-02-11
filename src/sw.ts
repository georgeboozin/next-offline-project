import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import type { PrecacheEntry } from "workbox-precaching";

declare const PRECACHE_ENTRIES: Array<PrecacheEntry | string>;

precacheAndRoute(PRECACHE_ENTRIES);

registerRoute(
  /\/_next\/image\?url=.+$/i,
  new StaleWhileRevalidate({
    cacheName: "next-image",
  })
);

registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new CacheFirst({
    cacheName: "static-images",
  })
);

registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-js",
  })
);

registerRoute(
  /\.(?:css)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-css",
  })
);

registerRoute(
  ({ request, url, sameOrigin }) =>
    sameOrigin &&
    !url.pathname.startsWith("/api/") &&
    request.headers.get("RSC") === "1" &&
    request.headers.get("Next-Router-Prefetch") === "1",
  new NetworkFirst({
    cacheName: "pages-rsc-prefetch",
  })
);

registerRoute(
  ({ request, url, sameOrigin }) =>
    sameOrigin &&
    !url.pathname.startsWith("/api/") &&
    request.headers.get("RSC") === "1",
  new NetworkFirst({
    cacheName: "pages-rsc",
  })
);

registerRoute(
  ({ url, sameOrigin }) => sameOrigin && !url.pathname.startsWith("/api/"),
  new NetworkFirst({
    cacheName: "pages",
  })
);

self.addEventListener("message", async (event) => {
  if (event.data.type === "navigationCache") {
    const pagesCache = await caches.open("pages");
    const url = event.data.url;
    const exist = await pagesCache.match(url);
    if (exist) {
      return;
    }
    const page = await fetch(url);
    if (!page.ok) {
      return;
    }
    return pagesCache.put(url, page.clone());
  }
});
