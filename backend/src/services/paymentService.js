import { Payment } from "../models/Payment.js";
import { User } from "../models/User.js";

export async function getPayments(filters = {}) {
  const query = {};
  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.customer) {
    query.customer = filters.customer;
  }

  return Payment.find(query)
    .populate("customer", "fullName email meterNumber")
    .populate("plan", "name monthlyFee")
    .sort({ createdAt: -1 });
}

export async function getPaymentById(id) {
  const payment = await Payment.findById(id)
    .populate("customer", "fullName email meterNumber")
    .populate("plan", "name monthlyFee");

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  return payment;
}

export async function createPayment(customerId, data) {
  const customer = await User.findById(customerId).populate("waterPlan");
  if (!customer || customer.role !== "customer") {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  if (customer.currentBalance <= 0) {
    const error = new Error("No outstanding balance");
    error.statusCode = 400;
    throw error;
  }

  const amount = data.amount ?? customer.currentBalance;

  return Payment.create({
    customer: customerId,
    plan: customer.waterPlan?._id,
    amount,
    screenshot: data.screenshot || null,
    status: "pending",
  });
}

export async function updatePaymentStatus(id, status) {
  const payment = await Payment.findById(id).populate("customer");

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  payment.status = status;
  await payment.save();

  if (status === "approved") {
    const customer = await User.findById(payment.customer._id);
    if (customer) {
      customer.currentBalance = Math.max(
        0,
        customer.currentBalance - payment.amount
      );
      await customer.save();
    }
  }

  return Payment.findById(id)
    .populate("customer", "fullName email meterNumber")
    .populate("plan", "name monthlyFee");
}

export async function deletePayment(id) {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Payment deleted" };
}

export async function getLatestPaymentForCustomer(customerId) {
  return Payment.findOne({ customer: customerId })
    .sort({ createdAt: -1 })
    .populate("plan", "name");
}
