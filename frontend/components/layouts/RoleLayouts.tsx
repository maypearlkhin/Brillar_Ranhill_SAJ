"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import type { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayoutShell from "@/components/layouts/DashboardLayoutShell";

const adminItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <DashboardIcon /> },
  { label: "Customers", href: "/admin/customers", icon: <PeopleOutlineIcon /> },
  { label: "Water Plans", href: "/admin/plans", icon: <WaterDropOutlinedIcon /> },
  { label: "Payments", href: "/admin/payments", icon: <PaymentsOutlinedIcon /> },
  { label: "Reports", href: "/admin/reports", icon: <AssessmentOutlinedIcon /> },
  { label: "Integration", href: "/admin/integration", icon: <ExtensionOutlinedIcon /> },
  { label: "Settings", href: "/admin/settings", icon: <SettingsOutlinedIcon /> },
];

const customerItems = [
  { label: "Dashboard", href: "/customer/dashboard", icon: <DashboardIcon /> },
  { label: "My Plan", href: "/customer/plan", icon: <WaterDropOutlinedIcon /> },
  { label: "Billing", href: "/customer/billing", icon: <ReceiptLongOutlinedIcon /> },
  { label: "Payments", href: "/customer/payments", icon: <PaymentsOutlinedIcon /> },
  { label: "Profile", href: "/customer/profile", icon: <PersonOutlineIcon /> },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="admin">
      <DashboardLayoutShell portalLabel="Admin Portal" sidebarItems={adminItems}>
        {children}
      </DashboardLayoutShell>
    </ProtectedRoute>
  );
}

export function CustomerLayout({ children, widget }: { children: ReactNode; widget?: ReactNode }) {
  return (
    <ProtectedRoute role="customer">
      <DashboardLayoutShell portalLabel="Customer Portal" sidebarItems={customerItems} extra={widget}>
        {children}
      </DashboardLayoutShell>
    </ProtectedRoute>
  );
}
