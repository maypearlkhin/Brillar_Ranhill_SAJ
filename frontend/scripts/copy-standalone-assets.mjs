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

console.log("Standalone bundle ready:", standaloneDir);
