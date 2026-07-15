import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next/standalone");

if (!existsSync(standaloneDir)) {
  console.error("Missing .next/standalone — run `npm run build` first.");
  process.exit(1);
}

cpSync(join(root, ".next/static"), join(standaloneDir, ".next/static"), { recursive: true });

if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(standaloneDir, "public"), { recursive: true });
}

for (const envFile of [".env.production", ".env.local"]) {
  const src = join(root, envFile);
  if (existsSync(src)) {
    cpSync(src, join(standaloneDir, envFile));
    console.log("Copied env:", envFile);
  }
}

const productionEnv = join(root, ".env.production");
const localEnv = join(root, ".env.local");
if (!existsSync(productionEnv) && existsSync(localEnv)) {
  cpSync(localEnv, join(standaloneDir, ".env.production"));
  console.log("Copied env: .env.local → .env.production (standalone)");
}

console.log("Standalone bundle ready:", standaloneDir);
