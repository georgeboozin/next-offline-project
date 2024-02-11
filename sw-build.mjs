import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/sw.ts"],
  bundle: true,
  outfile: "public/sw.js",
});
