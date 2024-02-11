import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
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
