import api from "./api";
import type {
  AdminDashboardStats,
  BillBreakdown,
  BillingHistoryResponse,
  BillingRange,
  CustomerDashboardStats,
  Payment,
  User,
  WaterPlan,
} from "@/types/auth";

export async function getAdminDashboard() {
  const { data } = await api.get<AdminDashboardStats>("/reports/dashboard");
  return data;
}

export async function getCustomerDashboard() {
  const { data } = await api.get<CustomerDashboardStats>("/reports/dashboard");
  return data;
}

export async function getReports() {
  const { data } = await api.get<AdminDashboardStats>("/reports");
  return data;
}

export async function getCustomers(status?: string) {
  const { data } = await api.get<User[]>("/customers", { params: status ? { status } : {} });
  return data;
}

export async function createCustomer(payload: Record<string, unknown>) {
  const { data } = await api.post<User>("/customers", payload);
  return data;
}

export async function updateCustomer(id: string, payload: Record<string, unknown>) {
  const { data } = await api.patch<User>(`/customers/${id}`, payload);
  return data;
}

export async function deleteCustomer(id: string) {
  const { data } = await api.delete<{ message: string }>(`/customers/${id}`);
  return data;
}

export async function getPlans() {
  const { data } = await api.get<WaterPlan[]>("/plans");
  return data;
}

export async function createPlan(payload: Partial<WaterPlan>) {
  const { data } = await api.post<WaterPlan>("/plans", payload);
  return data;
}

export async function updatePlan(id: string, payload: Partial<WaterPlan>) {
  const { data } = await api.patch<WaterPlan>(`/plans/${id}`, payload);
  return data;
}

export async function deletePlan(id: string) {
  const { data } = await api.delete<{ message: string }>(`/plans/${id}`);
  return data;
}

export async function getPayments(status?: string) {
  const { data } = await api.get<Payment[]>("/payments", { params: status ? { status } : {} });
  return data;
}

export async function submitPayment(amount: number, screenshot?: File) {
  const formData = new FormData();
  formData.append("amount", String(amount));
  if (screenshot) {
    formData.append("screenshot", screenshot);
  }
  const { data } = await api.post<Payment>("/payments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updatePaymentStatus(id: string, status: string) {
  const { data } = await api.patch<Payment>(`/payments/${id}`, { status });
  return data;
}

export async function getMyBilling() {
  const { data } = await api.get<{ customer: User; bill: BillBreakdown }>("/customers/me/billing");
  return data;
}

export async function getMyBillingHistory(params: {
  range?: BillingRange;
  from?: string;
  to?: string;
}) {
  const { data } = await api.get<BillingHistoryResponse>("/customers/me/billing/history", { params });
  return data;
}

export async function getMyProfile() {
  const { data } = await api.get<User>("/customers/me/profile");
  return data;
}

export async function updateMyProfile(payload: { fullName?: string; phone?: string; address?: string }) {
  const { data } = await api.patch<User>("/customers/me/profile", payload);
  return data;
}
