export type UserRole = "admin" | "customer";

export type CustomerStatus = "pending" | "approved" | "disabled";

export type WaterStatus = "on" | "off";

export type PaymentStatus = "pending" | "approved" | "rejected";

export type PlanStatus = "active" | "inactive";

export interface WaterPlan {
  _id: string;
  name: string;
  description: string;
  monthlyFee: number;
  pricePerM3: number;
  includedUsage: number;
  lateFee: number;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  meterNumber: string;
  waterPlan: WaterPlan | string | null;
  role: UserRole;
  status: CustomerStatus;
  currentBalance: number;
  waterStatus: WaterStatus;
  usageThisMonth: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  customer: User | string;
  plan: WaterPlan | string | null;
  amount: number;
  paymentDate: string;
  status: PaymentStatus;
  screenshot: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BillBreakdown {
  monthlyFee: number;
  usageCharge: number;
  usage: number;
  excess: number;
  total: number;
  plan?: WaterPlan;
}

export type BillingRange = "6m" | "3m" | "2m" | "today" | "custom";

export type BillStatus = "paid" | "unpaid" | "current";

export interface BillingRecord {
  _id: string;
  billingPeriod: string;
  periodStart: string;
  periodEnd: string;
  meterReadingStart: number;
  meterReadingEnd: number;
  usageM3: number;
  monthlyFee: number;
  usageCharge: number;
  totalAmount: number;
  paidAmount: number;
  status: BillStatus;
  dueDate: string;
  paidDate: string | null;
  plan?: WaterPlan | null;
}

export interface BillingHistorySummary {
  meterNumber: string;
  totalUsage: number;
  totalBilled: number;
  totalPaid: number;
  currentBalance: number;
  recordCount: number;
  range: BillingRange;
  from: string;
  to: string;
}

export interface BillingHistoryResponse {
  summary: BillingHistorySummary;
  records: BillingRecord[];
  currentBill: BillBreakdown;
  customer: {
    fullName: string;
    meterNumber: string;
    waterPlan: WaterPlan | null;
  };
}

export interface AdminDashboardStats {
  customers: number;
  pendingRegistrations: number;
  activeCustomers: number;
  disabledCustomers: number;
  monthlyRevenue: number;
  revenueThisMonth: number;
  pendingPayments: number;
  paidCustomers: number;
}

export interface CustomerDashboardStats {
  currentPlan: WaterPlan | null;
  currentBalance: number;
  waterStatus: WaterStatus;
  meterNumber: string;
  fullName: string;
  latestPayment: Payment | null;
  bill: BillBreakdown;
  currentBillRecord: BillingRecord | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  meterNumber: string;
  waterPlan: string;
}
