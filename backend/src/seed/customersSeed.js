import { User } from "../models/User.js";
import { WaterPlan } from "../models/WaterPlan.js";
import { Bill } from "../models/Bill.js";
import { Payment } from "../models/Payment.js";
import { buildBillAmounts } from "../services/billingService.js";

const REMOVED_LEGACY_EMAILS = [
  "alantan@gmail.com",
  "alantan@ranhill.com",
  "sarahgoh@gmail.com",
  "sarahgoh@ranhill.com",
];

const SAMPLE_CUSTOMERS = [
  {
    fullName: "Ahmad bin Hassan",
    phone: "+60 12-345 6789",
    email: "ahmad.hassan@ranhill.com",
    password: "user123",
    address: "No. 18, Jalan Mawar 3, Taman Johor Jaya, 81100 Johor Bahru, Johor",
    meterNumber: "MTR-20001",
    planName: "Residential Basic",
    status: "approved",
    waterStatus: "on",
    meterStart: 1050,
    monthlyUsage: [14, 17, 19, 16, 20, 22, 18, 21, 19, 23, 20, 18],
  },
  {
    fullName: "Siti Nurhaliza binti Omar",
    phone: "+60 17-882 3344",
    email: "siti.nurhaliza@ranhill.com",
    password: "user123",
    address: "Lot 72, Jalan Besar, 81000 Kulai, Johor",
    meterNumber: "MTR-20018",
    planName: "Premium",
    status: "approved",
    waterStatus: "on",
    meterStart: 1820,
    monthlyUsage: [22, 28, 25, 30, 27, 32, 29, 26],
  },
  {
    fullName: "Tan Wei Ming",
    phone: "+60 16-556 7890",
    email: "tan.weiming@ranhill.com",
    password: "user123",
    address: "22, Jalan Skudai Lama, Taman Universiti, 81300 Skudai, Johor",
    meterNumber: "MTR-20035",
    planName: "Commercial",
    status: "approved",
    waterStatus: "on",
    meterStart: 3200,
    monthlyUsage: [45, 52, 48, 55, 50, 47],
  },
];

function monthDate(year, month) {
  return new Date(year, month, 1);
}

function periodBounds(period) {
  const periodStart = new Date(period.getFullYear(), period.getMonth(), 1);
  const periodEnd = new Date(period.getFullYear(), period.getMonth() + 1, 0, 23, 59, 59, 999);
  return { periodStart, periodEnd };
}

async function findOrCreateCustomer(sample, plan) {
  let user = await User.findOne({ email: sample.email });

  const payload = {
    fullName: sample.fullName,
    phone: sample.phone,
    email: sample.email,
    address: sample.address,
    meterNumber: sample.meterNumber,
    waterPlan: plan._id,
    role: "customer",
    status: sample.status,
    waterStatus: sample.waterStatus,
  };

  if (!user) {
    user = await User.create({ ...payload, password: sample.password });
    return user;
  }

  Object.assign(user, payload);
  user.password = sample.password;
  await user.save();
  return user;
}

async function seedBillingHistory(user, plan, sample) {
  await Bill.deleteMany({ customer: user._id });
  await Payment.deleteMany({ customer: user._id });

  const now = new Date();
  const months = sample.monthlyUsage.length;
  let meterReading = sample.meterStart;

  for (let i = 0; i < months; i++) {
    const offset = months - 1 - i;
    const period = monthDate(now.getFullYear(), now.getMonth() - offset);
    const usage = sample.monthlyUsage[i];
    const readingStart = meterReading;
    const readingEnd = meterReading + usage;
    meterReading = readingEnd;

    const amounts = buildBillAmounts(plan, usage);
    const isCurrentMonth = offset === 0;
    const isPaid = !isCurrentMonth;
    const { periodStart, periodEnd } = periodBounds(period);

    const bill = await Bill.create({
      customer: user._id,
      plan: plan._id,
      billingPeriod: period,
      periodStart,
      periodEnd,
      meterReadingStart: readingStart,
      meterReadingEnd: readingEnd,
      usageM3: usage,
      monthlyFee: amounts.monthlyFee,
      usageCharge: amounts.usageCharge,
      totalAmount: amounts.totalAmount,
      paidAmount: isPaid ? amounts.totalAmount : 0,
      status: isCurrentMonth ? "current" : "paid",
      dueDate: new Date(period.getFullYear(), period.getMonth(), 15),
      paidDate: isPaid ? new Date(period.getFullYear(), period.getMonth(), 10) : null,
    });

    if (isPaid) {
      await Payment.create({
        customer: user._id,
        plan: plan._id,
        amount: amounts.totalAmount,
        paymentDate: bill.paidDate,
        status: "approved",
      });
    }
  }

  const currentUsage = sample.monthlyUsage[months - 1];
  const currentAmounts = buildBillAmounts(plan, currentUsage);

  user.usageThisMonth = currentUsage;
  user.currentBalance = currentAmounts.totalAmount;
  await user.save();
}

export async function seedCustomers() {
  await User.deleteMany({ email: { $in: REMOVED_LEGACY_EMAILS }, role: "customer" });

  for (const sample of SAMPLE_CUSTOMERS) {
    const plan = await WaterPlan.findOne({ name: sample.planName });
    if (!plan) continue;

    const user = await findOrCreateCustomer(sample, plan);
    await seedBillingHistory(user, plan, sample);
  }

  console.log("Sample customers & billing history seeded (3 users: 12m, 8m, 6m)");
}
