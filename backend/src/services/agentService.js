import mongoose from "mongoose";
import { Bill } from "../models/Bill.js";
import { User } from "../models/User.js";
import { calculateBill } from "./customerService.js";

function formatBillRecord(bill) {
  const record = bill.toObject ? bill.toObject() : bill;
  return {
    _id: record._id,
    billingPeriod: record.billingPeriod,
    periodStart: record.periodStart,
    periodEnd: record.periodEnd,
    meterReadingStart: record.meterReadingStart,
    meterReadingEnd: record.meterReadingEnd,
    usageM3: record.usageM3,
    monthlyFee: record.monthlyFee,
    usageCharge: record.usageCharge,
    totalAmount: record.totalAmount,
    paidAmount: record.paidAmount,
    status: record.status,
    dueDate: record.dueDate,
    paidDate: record.paidDate,
    plan: record.plan ?? null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export async function getBillingByUserId(userId) {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("A valid userId is required.");
    error.statusCode = 400;
    throw error;
  }

  const customer = await User.findOne({ _id: userId, role: "customer" }).populate("waterPlan");

  if (!customer) {
    const error = new Error("Customer not found.");
    error.statusCode = 404;
    throw error;
  }

  const records = await Bill.find({ customer: userId })
    .populate("plan", "name description monthlyFee pricePerM3 includedUsage lateFee status")
    .sort({ billingPeriod: -1 });

  const totalUsage = records.reduce((sum, bill) => sum + bill.usageM3, 0);
  const totalBilled = records.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const totalPaid = records.reduce((sum, bill) => sum + bill.paidAmount, 0);

  const billingPeriods = records.map((bill) => bill.billingPeriod);
  const from = billingPeriods.length
    ? new Date(Math.min(...billingPeriods.map((date) => new Date(date).getTime())))
    : null;
  const to = billingPeriods.length
    ? new Date(Math.max(...billingPeriods.map((date) => new Date(date).getTime())))
    : null;

  return {
    summary: {
      meterNumber: customer.meterNumber,
      totalUsage,
      totalBilled,
      totalPaid,
      currentBalance: customer.currentBalance,
      recordCount: records.length,
      from,
      to,
    },
    records: records.map(formatBillRecord),
    currentBill: calculateBill(customer),
    customer: {
      _id: customer._id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      meterNumber: customer.meterNumber,
      waterStatus: customer.waterStatus,
      status: customer.status,
      waterPlan: customer.waterPlan,
    },
  };
}
