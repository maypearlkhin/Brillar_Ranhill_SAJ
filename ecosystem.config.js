/**
 * PM2 ecosystem — run from repo root:
 *   bash scripts/pm2-start.sh
 *
 * Build frontend ON Linux first (never copy .next from Windows).
 */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4013/api";

module.exports = {
  apps: [
    {
      name: "ranhill-saj-backend",
      cwd: "./backend",
      script: "src/server.js",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      error_file: "../logs/backend-error.log",
      out_file: "../logs/backend-out.log",
      env: {
        PORT: 4013,
        NODE_ENV: "production",
      },
    },
    {
      name: "ranhill-saj-frontend",
      cwd: "./frontend/.next/standalone",
      script: "server.js",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      error_file: "../../../logs/frontend-error.log",
      out_file: "../../../logs/frontend-out.log",
      env: {
        PORT: 3017,
        HOSTNAME: "0.0.0.0",
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: apiUrl,
      },
    },
  ],
};
