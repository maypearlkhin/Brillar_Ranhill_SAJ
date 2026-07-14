import * as reportService from "../services/reportService.js";
import * as customerService from "../services/customerService.js";
import * as paymentService from "../services/paymentService.js";
import { Bill } from "../models/Bill.js";

export async function getDashboard(req, res) {
  if (req.user.role === "admin") {
    const report = await reportService.getDashboardReport();
    return res.json(report);
  }

  const customer = await customerService.getCustomerById(req.user._id);
  const bill = customerService.calculateBill(customer);
  const latestPayment = await paymentService.getLatestPaymentForCustomer(
    req.user._id
  );
  const currentBillRecord = await Bill.findOne({
    customer: req.user._id,
    status: "current",
  }).sort({ billingPeriod: -1 });

  res.json({
    currentPlan: customer.waterPlan,
    currentBalance: customer.currentBalance,
    waterStatus: customer.waterStatus,
    meterNumber: customer.meterNumber,
    fullName: customer.fullName,
    latestPayment,
    bill,
    currentBillRecord,
  });
}

export async function getReports(req, res) {
  const report = await reportService.getDashboardReport();
  res.json(report);
}
