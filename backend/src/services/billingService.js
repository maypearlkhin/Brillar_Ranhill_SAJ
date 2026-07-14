import { Bill } from "../models/Bill.js";
import { User } from "../models/User.js";
import { calculateBill } from "./customerService.js";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function resolveDateRange(query) {
  const now = new Date();
  const range = query.range || "6m";

  if (range === "today") {
    return { start: startOfMonth(now), end: endOfDay(now) };
  }

  if (range === "3m") {
    return { start: startOfMonth(new Date(now.getFullYear(), now.getMonth() - 2, 1)), end: endOfMonth(now) };
  }

  if (range === "2m") {
    return { start: startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1)), end: endOfMonth(now) };
  }

  if (range === "6m") {
    return { start: startOfMonth(new Date(now.getFullYear(), now.getMonth() - 5, 1)), end: endOfMonth(now) };
  }

  if (range === "custom") {
    const start = query.from ? startOfDay(new Date(query.from)) : startOfMonth(new Date(now.getFullYear(), now.getMonth() - 5, 1));
    const end = query.to ? endOfDay(new Date(query.to)) : endOfMonth(now);
    return { start, end };
  }

  return { start: startOfMonth(new Date(now.getFullYear(), now.getMonth() - 5, 1)), end: endOfMonth(now) };
}

export async function getBillingHistory(customerId, query = {}) {
  const customer = await User.findOne({ _id: customerId, role: "customer" }).populate("waterPlan");

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const { start, end } = resolveDateRange(query);

  const records = await Bill.find({
    customer: customerId,
    billingPeriod: { $gte: start, $lte: end },
  })
    .populate("plan", "name monthlyFee includedUsage pricePerM3")
    .sort({ billingPeriod: -1 });

  const totalUsage = records.reduce((sum, bill) => sum + bill.usageM3, 0);
  const totalBilled = records.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const totalPaid = records.reduce((sum, bill) => sum + bill.paidAmount, 0);

  return {
    summary: {
      meterNumber: customer.meterNumber,
      totalUsage,
      totalBilled,
      totalPaid,
      currentBalance: customer.currentBalance,
      recordCount: records.length,
      range: query.range || "6m",
      from: start,
      to: end,
    },
    records,
    currentBill: calculateBill(customer),
    customer: {
      fullName: customer.fullName,
      meterNumber: customer.meterNumber,
      waterPlan: customer.waterPlan,
    },
  };
}

export function buildBillAmounts(plan, usageM3) {
  const monthlyFee = plan.monthlyFee;
  const excess = Math.max(0, usageM3 - plan.includedUsage);
  const usageCharge = excess * plan.pricePerM3;
  const totalAmount = monthlyFee + usageCharge;

  return { monthlyFee, usageCharge, excess, totalAmount };
}
