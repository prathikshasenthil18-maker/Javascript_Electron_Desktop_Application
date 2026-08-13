import fs from "node:fs";
import path from "node:path";
const ROOT = process.cwd();
const outDir = path.join(ROOT, "reports", "gutcheck");
fs.mkdirSync(outDir, { recursive: true });
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const checks = {
  has_name: Boolean(pkg.name),
  has_build: Boolean(pkg.scripts && pkg.scripts.build),
  has_test: Boolean(pkg.scripts && pkg.scripts.test),
  has_src: fs.existsSync(path.join(ROOT, "src")),
  has_main_entry: Boolean(pkg.main),
  has_electron_dep: Boolean(
    (pkg.devDependencies && pkg.devDependencies.electron) ||
    (pkg.dependencies && pkg.dependencies.electron)
  ),
};
const summary = { tool: "gutcheck", linked_project: true, checks, pass: Object.values(checks).every(Boolean) };
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (!summary.pass) process.exitCode = 1;
