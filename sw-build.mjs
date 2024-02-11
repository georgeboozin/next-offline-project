import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";

/**
 * read recursive directory
 * @param {string} dir - path to dir
 * @param {string[]} fileList - list of files
 * @return {string[]} fileList - list of files
 * @example
 *     readDir('public')
 *     // ['public/manifest.json','public/favicon.ico', ...]
 */
async function readDir(dir, fileList = []) {
  const files = await fs.promises.readdir(dir);
  for (let file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      fileList = await readDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const staticDir = ".next/static";
const publicDir = "public";
const BUILD_ID = await fs.promises.readFile(".next/BUILD_ID", "utf8");

const publicStaticPrecacheEntries = (await readDir(publicDir)).map((url) => ({
  url: url.replace("public/", "/"),
  revision: BUILD_ID,
}));
// [{ url: string; revision: string }]

const nextStaticPrecacheEntries = (await readDir(staticDir)).map((url) => ({
  url: url.replace(".next", "/_next"),
  revision: BUILD_ID,
}));

const precacheEntries = []
  .concat(publicStaticPrecacheEntries)
  .concat(nextStaticPrecacheEntries);

await esbuild.build({
  entryPoints: ["src/sw.ts"],
  bundle: true,
  outfile: "public/sw.js",
  define: {
    PRECACHE_ENTRIES: JSON.stringify(precacheEntries),
  },
});
