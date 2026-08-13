import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const ROOT = process.cwd();
const tool = "Dolos";
const outDir = path.join(ROOT, "reports", "Dolos");
fs.mkdirSync(outDir, { recursive: true });
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (/\.(js|json|html|css)$/.test(ent.name)) acc.push(path.relative(ROOT, full));
  }
  return acc;
}
const sources = walk(path.join(ROOT, "src"));
const binCandidates = {
  debtmap: ["debtmap"],
  cccc: ["cccc"],
  Dolos: ["dolos"],
  OpenGrep: ["opengrep", "ogrep"],
  Opengrep: ["opengrep"],
  trivy: ["trivy"],
  CodeQL: ["codeql"],
  "Git-Spark": ["git-spark", "gitspark"],
};
const candidates = binCandidates[tool] || [String(tool).toLowerCase()];
let cli = null;
for (const c of candidates) {
  const which = spawnSync(process.platform === "win32" ? "where" : "which", [c], { encoding: "utf8" });
  if (which.status === 0) { cli = c; break; }
}
const summary = {
  tool,
  linked_project: true,
  source_files: sources,
  cli_available: Boolean(cli),
  cli,
  note: cli
    ? "CLI found on PATH; invoke separately against linked sources."
    : "CLI not on PATH; linkage + inventory written for platform wiring.",
};
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
