#!/usr/bin/env bash
# Build + PM2 start. Run on Linux EC2 from repo root.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Backend"
cd "$ROOT/backend"
npm ci

echo "==> Frontend"
cd "$ROOT/frontend"
if [ ! -f .env.production ]; then
  cp .env.production.example .env.production
  echo "    Created frontend/.env.production — edit NEXT_PUBLIC_API_URL if needed"
fi
npm ci
npm run build

echo "==> PM2"
cd "$ROOT"
pm2 delete ranhill-saj-backend ranhill-saj-frontend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

pm2 list
echo ""
echo "Logs: pm2 logs ranhill-saj-backend"
