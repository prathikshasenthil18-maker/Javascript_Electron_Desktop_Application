#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
mkdir -p reports/knip
npx --no-install knip --no-progress > reports/knip/knip.txt 2>&1 || true
echo "{\"tool\":\"knip\",\"linked\":true}" > reports/knip/summary.json
echo "[tools/knip] done"
