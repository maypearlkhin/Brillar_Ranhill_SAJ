# Deploying Ranhill SAJ (EC2 / Linux + PM2)

## PM2 start

```bash
cp backend/.env.example backend/.env          # edit once
cp frontend/.env.production.example frontend/.env.production   # set API URL

chmod +x scripts/pm2-start.sh
bash scripts/pm2-start.sh
```

No `export` needed — PM2 reads `frontend/.env.production` automatically.

## Frontend env file

| File | When |
|------|------|
| `frontend/.env.local` | Local `npm run dev` |
| `frontend/.env.production` | PM2 / production build |

Example `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api-ranhill.atenxion.ai/api
```

This file is copied into `frontend/.next/standalone/` during `npm run build`.

## Login / logout webhooks

On success:
1. `POST {atenxionBackendUrl}/post-login/user-login` with `{ userId }`
2. Redirect

On logout:
1. `POST {atenxionBackendUrl}/post-login/user-logout` with `{ userId }`
2. Clear session → redirect `/login`

Config (script, token, Atenxion URL) comes from **Admin → Integration** in the DB.

## PM2 commands

```bash
pm2 list
pm2 logs
pm2 restart ecosystem.config.js
pm2 save
```

## Do not copy Windows `.next` to Linux

Build on the server with `bash scripts/pm2-start.sh`.
