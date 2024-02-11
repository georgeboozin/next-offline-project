import { precacheAndRoute } from "workbox-precaching";
import type { PrecacheEntry } from "workbox-precaching";

declare const PRECACHE_ENTRIES: Array<PrecacheEntry | string>;

precacheAndRoute(PRECACHE_ENTRIES);
