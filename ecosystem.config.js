/**
 * PM2 ecosystem — production processes.
 *
 * Setup:
 *   cd frontend && npm ci && npm run build
 *   cd backend  && npm ci
 *   pm2 start ecosystem.config.js
 *
 * Frontend serves the pre-built output from frontend/.next via `next start`.
 */
module.exports = {
  apps: [
    {
      name: "ranhill-saj-backend",
      cwd: "./backend",
      script: "src/server.js",
      interpreter: "node",
      env: {
        PORT: 4013,
        NODE_ENV: "production",
      },
    },
    {
      name: "ranhill-saj-frontend",
      cwd: "./frontend",
      interpreter: "node",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: 3017,
        NODE_ENV: "production",
      },
    },
  ],
};
