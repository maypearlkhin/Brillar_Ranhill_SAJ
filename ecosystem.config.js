/**
 * PM2 — run from repo root: bash scripts/pm2-start.sh
 *
 * Frontend reads frontend/.env.production (copied into standalone on build).
 * No need to export NEXT_PUBLIC_API_URL in the shell.
 */
const path = require("path");
const fs = require("fs");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let val = trimmed.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const feEnv = {
  ...loadEnvFile(path.join(__dirname, "frontend", ".env.production")),
  ...loadEnvFile(path.join(__dirname, "frontend", ".env.local")),
};

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
      interpreter_args: "--env-file .env.production",
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
        ...feEnv,
      },
    },
  ],
};
