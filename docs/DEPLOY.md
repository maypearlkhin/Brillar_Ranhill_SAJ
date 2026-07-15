# Deploying Ranhill SAJ (EC2 / Linux + PM2)

## Why `Bus error (core dumped)` happens

If you **build on Windows** and copy `.next` and/or `node_modules` to **Linux EC2**, Next.js crashes with `Bus error`. Build on the server instead.

**Never copy from Windows to EC2:**
- `frontend/node_modules/`
- `frontend/.next/`

## PM2 — one command (recommended)

From repo root on EC2:

```bash
# 1. Env files (once)
cp backend/.env.example backend/.env          # edit JWT, MongoDB
cp frontend/.env.example frontend/.env.local    # optional for local dev

# 2. Production API URL for the browser (set before PM2 start)
export NEXT_PUBLIC_API_URL=https://api-ranhill.atenxion.ai/api

# 3. Build + PM2
chmod +x scripts/pm2-start.sh
bash scripts/pm2-start.sh
```

PM2 starts both apps:

| PM2 name | Port | CWD |
|----------|------|-----|
| `ranhill-saj-backend` | 4013 | `backend/` |
| `ranhill-saj-frontend` | 3017 | `frontend/.next/standalone/` |

### Useful PM2 commands

```bash
pm2 list
pm2 logs
pm2 logs ranhill-saj-frontend
pm2 restart ecosystem.config.js
pm2 stop ecosystem.config.js
pm2 save
pm2 startup    # auto-start on reboot (run the command it prints)
```

Logs are written to `logs/` in the repo root.

## Manual steps (if you prefer)

```bash
cd backend && npm ci
cd ../frontend && npm ci && npm run build
cd ..
pm2 start ecosystem.config.js
pm2 save
```

## Environment files

| App | File | Loaded by |
|-----|------|-----------|
| Backend | `backend/.env` | dotenv in server |
| Frontend | PM2 `NEXT_PUBLIC_API_URL` in `ecosystem.config.js` or shell export |

## Requirements

- Node.js **20+** (`node -v`)
- PM2 installed globally: `npm i -g pm2`
