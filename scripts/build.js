import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import * as esbuild from "esbuild";

const ROOT = process.cwd();
const dist = path.join(ROOT, "dist");
fs.mkdirSync(dist, { recursive: true });
fs.mkdirSync(path.join(dist, "renderer"), { recursive: true });

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (ent.name.endsWith(".js")) acc.push(full);
  }
  return acc;
}

const sources = walk(path.join(ROOT, "src"));
for (const file of sources) {
  const r = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    process.exit(r.status || 1);
  }
}

const common = {
  bundle: true,
  platform: "node",
  format: "esm",
  target: ["node20"],
  packages: "external",
};

await esbuild.build({
  ...common,
  entryPoints: [path.join(ROOT, "src/main/main.js")],
  outfile: path.join(dist, "main.js"),
  banner: { js: "// Electron main — Customer Version 21" },
});

await esbuild.build({
  ...common,
  entryPoints: [path.join(ROOT, "src/preload/preload.js")],
  outfile: path.join(dist, "preload.js"),
  banner: { js: "// Electron preload — Customer Version 21" },
});

await esbuild.build({
  entryPoints: [path.join(ROOT, "src/renderer/renderer.js")],
  outfile: path.join(dist, "renderer/renderer.js"),
  bundle: true,
  platform: "browser",
  format: "esm",
  target: ["es2019"],
  banner: { js: "// Electron renderer — Customer Version 21" },
});

fs.copyFileSync(
  path.join(ROOT, "src/renderer/index.html"),
  path.join(dist, "renderer/index.html")
);
fs.copyFileSync(
  path.join(ROOT, "src/renderer/styles.css"),
  path.join(dist, "renderer/styles.css")
);

fs.writeFileSync(
  path.join(dist, "build-manifest.json"),
  JSON.stringify(
    {
      ok: true,
      customer_version: 21,
      branch: "Version_21",
      entries: ["dist/main.js", "dist/preload.js", "dist/renderer/renderer.js"],
      checked_files: sources.map((f) => path.relative(ROOT, f)),
    },
    null,
    2
  )
);
console.log(JSON.stringify({ ok: true, checked: sources.length, out: "dist/" }, null, 2));
