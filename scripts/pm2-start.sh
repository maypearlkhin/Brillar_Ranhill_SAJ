#!/usr/bin/env bash
# Build (if needed) and start both apps with PM2. Run from repo root on Linux EC2.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

mkdir -p logs

echo "==> Backend: install dependencies"
cd "$ROOT/backend"
if [ ! -d node_modules ]; then
  npm ci
fi

echo "==> Frontend: build standalone bundle (Linux)"
cd "$ROOT/frontend"
if [ ! -f .env.production ]; then
  echo "    Creating frontend/.env.production from example — edit NEXT_PUBLIC_API_URL if needed"
  cp .env.production.example .env.production
fi
npm ci
npm run build

cd "$ROOT"

echo "==> PM2: start / reload"
if pm2 describe ranhill-saj-backend >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js --update-env
else
  pm2 start ecosystem.config.js
fi

pm2 save
echo ""
echo "==> Running:"
pm2 list
echo ""
echo "Logs:  pm2 logs"
echo "Stop:  pm2 stop ecosystem.config.js"
