# Deploy (EC2 + PM2)

```bash
cp backend/.env.example backend/.env
cp frontend/.env.production.example frontend/.env.production
# ensure: NEXT_PUBLIC_API_URL=https://api-ranhill.atenxion.ai/api

bash scripts/pm2-start.sh
```

## PM2 apps

| Name | Port | Command |
|------|------|---------|
| ranhill-saj-backend | 4013 | `node src/server.js` |
| ranhill-saj-frontend | 3017 | `npm start` in `frontend/` |

Build on the server (do not copy `.next` from Windows).

## Frontend API URL

File: `frontend/.env.production`

```env
NEXT_PUBLIC_API_URL=https://api-ranhill.atenxion.ai/api
```

Then rebuild + restart:

```bash
cd frontend && npm run build && cd ..
pm2 restart ecosystem.config.js --update-env
```

If the browser still calls `localhost`, the env file was wrong at build/runtime — fix `.env.production` and rebuild.

## Webhook logs

```bash
pm2 logs ranhill-saj-backend
```
