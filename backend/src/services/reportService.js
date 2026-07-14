import { User } from "../models/User.js";
import { Payment } from "../models/Payment.js";

export async function getDashboardReport() {
  const [
    totalCustomers,
    pendingRegistrations,
    activeCustomers,
    disabledCustomers,
    approvedPayments,
    pendingPayments,
  ] = await Promise.all([
    User.countDocuments({ role: "customer" }),
    User.countDocuments({ role: "customer", status: "pending" }),
    User.countDocuments({ role: "customer", status: "approved" }),
    User.countDocuments({ role: "customer", status: "disabled" }),
    Payment.find({ status: "approved" }),
    Payment.countDocuments({ status: "pending" }),
  ]);

  const monthlyRevenue = approvedPayments.reduce((sum, p) => sum + p.amount, 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const revenueThisMonth = approvedPayments
    .filter((p) => new Date(p.paymentDate) >= startOfMonth)
    .reduce((sum, p) => sum + p.amount, 0);

  const paidCustomers = await Payment.distinct("customer", {
    status: "approved",
  });

  return {
    customers: totalCustomers,
    pendingRegistrations,
    activeCustomers,
    disabledCustomers,
    monthlyRevenue,
    revenueThisMonth,
    pendingPayments,
    paidCustomers: paidCustomers.length,
  };
}
