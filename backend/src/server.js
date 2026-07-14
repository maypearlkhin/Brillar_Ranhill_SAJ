import app from "./app.js";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { seedAdmin, seedPlans } from "./seed/adminSeed.js";
import { seedCustomers } from "./seed/customersSeed.js";

async function start() {
  await connectDatabase();
  await seedPlans();
  await seedAdmin();
  await seedCustomers();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
