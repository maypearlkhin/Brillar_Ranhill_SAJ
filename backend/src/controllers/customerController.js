import * as customerService from "../services/customerService.js";
import * as billingService from "../services/billingService.js";

export async function listCustomers(req, res) {
  const customers = await customerService.getCustomers(req.query);
  res.json(customers);
}

export async function getCustomer(req, res) {
  const customer = await customerService.getCustomerById(req.params.id);
  res.json(customer);
}

export async function createCustomer(req, res) {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).json(customer);
}

export async function updateCustomer(req, res) {
  const customer = await customerService.updateCustomer(
    req.params.id,
    req.body
  );
  res.json(customer);
}

export async function deleteCustomer(req, res) {
  const result = await customerService.deleteCustomer(req.params.id);
  res.json(result);
}

export async function getMyBilling(req, res) {
  const user = await customerService.getCustomerById(req.user._id);
  const bill = customerService.calculateBill(user);
  res.json({ customer: user, bill });
}

export async function getMyBillingHistory(req, res) {
  const history = await billingService.getBillingHistory(req.user._id, req.query);
  res.json(history);
}

export async function getMyProfile(req, res) {
  const customer = await customerService.getCustomerById(req.user._id);
  res.json(customer);
}

export async function updateMyProfile(req, res) {
  const allowed = { fullName: req.body.fullName, phone: req.body.phone, address: req.body.address };
  const customer = await customerService.updateCustomer(req.user._id, allowed);
  res.json(customer);
}
