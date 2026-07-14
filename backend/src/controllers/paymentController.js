import * as paymentService from "../services/paymentService.js";

export async function listPayments(req, res) {
  const filters = { ...req.query };

  if (req.user.role === "customer") {
    filters.customer = req.user._id;
  }

  const payments = await paymentService.getPayments(filters);
  res.json(payments);
}

export async function getPayment(req, res) {
  const payment = await paymentService.getPaymentById(req.params.id);

  if (
    req.user.role === "customer" &&
    payment.customer._id.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(payment);
}

export async function createPayment(req, res) {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Only customers can submit payments" });
  }

  const payment = await paymentService.createPayment(req.user._id, {
    amount: req.body.amount ? Number(req.body.amount) : undefined,
    screenshot: req.file ? `/uploads/${req.file.filename}` : null,
  });
  res.status(201).json(payment);
}

export async function updatePayment(req, res) {
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid payment status" });
  }

  const payment = await paymentService.updatePaymentStatus(
    req.params.id,
    status
  );
  res.json(payment);
}

export async function deletePayment(req, res) {
  const result = await paymentService.deletePayment(req.params.id);
  res.json(result);
}

export async function getLatestPayment(req, res) {
  const payment = await paymentService.getLatestPaymentForCustomer(
    req.user._id
  );
  res.json(payment);
}
