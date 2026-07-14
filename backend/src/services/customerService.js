import { User } from "../models/User.js";
import { WaterPlan } from "../models/WaterPlan.js";

function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
}

export async function getCustomers(filters = {}) {
  const query = { role: "customer" };
  if (filters.status) {
    query.status = filters.status;
  }

  const customers = await User.find(query)
    .populate("waterPlan")
    .sort({ createdAt: -1 });

  return customers.map(sanitizeUser);
}

export async function getCustomerById(id) {
  const customer = await User.findOne({ _id: id, role: "customer" }).populate(
    "waterPlan"
  );

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  return sanitizeUser(customer);
}

export async function createCustomer(data) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const plan = await WaterPlan.findById(data.waterPlan);
  if (!plan) {
    const error = new Error("Water plan not found");
    error.statusCode = 400;
    throw error;
  }

  const usage = data.usageThisMonth ?? Math.floor(Math.random() * 20) + 5;
  const usageCharge = Math.max(0, usage - plan.includedUsage) * plan.pricePerM3;
  const balance = data.currentBalance ?? plan.monthlyFee + usageCharge;

  const customer = await User.create({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    address: data.address || "",
    meterNumber: data.meterNumber || "",
    waterPlan: data.waterPlan,
    role: "customer",
    status: data.status || "approved",
    currentBalance: balance,
    usageThisMonth: usage,
    waterStatus: data.waterStatus || "on",
  });

  const populated = await User.findById(customer._id).populate("waterPlan");
  return sanitizeUser(populated);
}

export async function updateCustomer(id, data) {
  const customer = await User.findOne({ _id: id, role: "customer" });
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const allowed = [
    "fullName",
    "phone",
    "email",
    "address",
    "meterNumber",
    "waterPlan",
    "status",
    "currentBalance",
    "waterStatus",
    "usageThisMonth",
    "password",
  ];

  for (const key of allowed) {
    if (data[key] !== undefined) {
      customer[key] = data[key];
    }
  }

  await customer.save();
  const populated = await User.findById(customer._id).populate("waterPlan");
  return sanitizeUser(populated);
}

export async function deleteCustomer(id) {
  const customer = await User.findOneAndDelete({ _id: id, role: "customer" });
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Customer deleted" };
}

export function calculateBill(customer) {
  const plan = customer.waterPlan;
  if (!plan) {
    return { monthlyFee: 0, usageCharge: 0, total: customer.currentBalance || 0 };
  }

  const monthlyFee = plan.monthlyFee;
  const usage = customer.usageThisMonth || 0;
  const excess = Math.max(0, usage - plan.includedUsage);
  const usageCharge = excess * plan.pricePerM3;
  const total = monthlyFee + usageCharge;

  return { monthlyFee, usageCharge, usage, excess, total, plan };
}
