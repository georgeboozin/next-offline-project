import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./global.css";
import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { ServiceWorker } from "./service-worker";

const APP_NAME = "Offline example";
const APP_DESCRIPTION = "Offline Next.js";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ServiceWorker />
        <header className={styles.header}>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link href="/">
                  <Image
                    src="/app-icon.webp"
                    height={30}
                    width={30}
                    alt="Logo"
                  />
                </Link>
              </li>
              <li>
                <Link href="/ssg">SSG</Link>
              </li>
              <li>
                <Link href="/csr">CSR</Link>
              </li>
              <li>
                <Link href="/ssr">SSR</Link>
              </li>
              <li>
                <Link href="/ssr/42">Dynamic route with SSR</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
