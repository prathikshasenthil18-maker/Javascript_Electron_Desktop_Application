#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p reports/oxlint
if npx --no-install oxlint --version >/dev/null 2>&1; then
  npx --no-install oxlint src scripts test tool-fixtures | tee reports/oxlint/oxlint.txt || true
else
  npm run oxlint | tee reports/oxlint/oxlint.txt || true
fi
echo "{\"tool\":\"oxlint\",\"linked\":true}" > reports/oxlint/summary.json
echo "[tools/oxlint] done"
