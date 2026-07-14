import { seedAdmin, seedPlans } from "./adminSeed.js";
import { seedCustomers } from "./customersSeed.js";
import { connectDatabase } from "../config/db.js";

async function run() {
  await connectDatabase();
  await seedPlans();
  await seedAdmin();
  await seedCustomers();
  console.log("Seed completed");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
