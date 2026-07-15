# Deploy (EC2 + PM2)

```bash
cp backend/.env.example backend/.env
cp frontend/.env.production.example frontend/.env.production   # edit API URL

bash scripts/pm2-start.sh
```

## PM2 apps

| Name | Port | Command |
|------|------|---------|
| ranhill-saj-backend | 4013 | `node src/server.js` |
| ranhill-saj-frontend | 3017 | `npm start` in `frontend/` |

Build runs **on the server** (do not copy `.next` from Windows).

## Webhook logs

```bash
pm2 logs ranhill-saj-backend
```

On customer login/logout you will see:
```
[Auth] Login OK: ahmad.hassan@ranhill.com role=customer
[Auth] Triggering Atenxion login webhook...
[Atenxion] Login webhook called userId=...
[Atenxion] POST https://backend.atenxion.ai/api/post-login/user-login
[Atenxion] Response: HTTP 200
[Atenxion] OK /post-login/user-login userId=...
```

## Frontend env

`frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api-ranhill.atenxion.ai/api
```

No `export` needed — PM2 reads this file via `ecosystem.config.js`.
