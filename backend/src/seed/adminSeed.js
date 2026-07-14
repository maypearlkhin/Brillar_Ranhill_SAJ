import { User } from "../models/User.js";
import { WaterPlan } from "../models/WaterPlan.js";

const DEFAULT_PLANS = [
  {
    name: "Residential Basic",
    description: "For households with typical monthly usage up to 20 m³. Lowest monthly fee.",
    monthlyFee: 15,
    pricePerM3: 0.55,
    includedUsage: 20,
    lateFee: 5,
    status: "active",
  },
  {
    name: "Commercial",
    description: "For shops, offices & F&B. Higher base fee covers larger meter capacity, 50 m³ included, and priority supply.",
    monthlyFee: 45,
    pricePerM3: 0.85,
    includedUsage: 50,
    lateFee: 15,
    status: "active",
  },
  {
    name: "Industrial",
    description: "For factories & high-volume sites. Highest capacity (200 m³ included) with dedicated infrastructure support.",
    monthlyFee: 120,
    pricePerM3: 1.2,
    includedUsage: 200,
    lateFee: 30,
    status: "active",
  },
  {
    name: "Premium",
    description: "For larger homes. More included usage (40 m³) at a lower overage rate than Basic.",
    monthlyFee: 35,
    pricePerM3: 0.45,
    includedUsage: 40,
    lateFee: 8,
    status: "active",
  },
];

export async function seedAdmin() {
  const existing = await User.findOne({ email: "admin@ranhill.com" });
  if (existing) {
    return;
  }

  await User.create({
    fullName: "System Administrator",
    phone: "0000000000",
    email: "admin@ranhill.com",
    password: "admin123",
    role: "admin",
    status: "approved",
    waterStatus: "on",
  });

  console.log("Default admin seeded: admin@ranhill.com / admin123");
}

export async function seedPlans() {
  for (const plan of DEFAULT_PLANS) {
    const exists = await WaterPlan.findOne({ name: plan.name });
    if (!exists) {
      await WaterPlan.create(plan);
    }
  }
  console.log("Water plans seeded");
}
