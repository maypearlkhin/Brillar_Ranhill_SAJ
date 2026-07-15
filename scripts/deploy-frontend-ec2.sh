#!/usr/bin/env bash
# Run ON the EC2 server (Linux) — do not copy .next or node_modules from Windows.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo "==> Installing dependencies (Linux native modules)..."
npm ci

echo "==> Building Next.js (standalone)..."
npm run build

echo "==> Done. Start with:"
echo "    cd frontend && PORT=3017 HOSTNAME=0.0.0.0 npm run start:standalone"
echo "    # or: pm2 start ../ecosystem.config.js"
