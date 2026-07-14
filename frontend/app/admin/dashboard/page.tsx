"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
import { getAdminDashboard } from "@/services/dataService";
import type { AdminDashboardStats } from "@/types/auth";
import { PageHeader, StatCard, formatCurrency } from "@/components/ui/DashboardUI";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);

  useEffect(() => {
    getAdminDashboard().then(setStats).catch(console.error);
  }, []);

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Overview of customers, revenue, and payments." />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Customers" value={stats?.customers ?? "—"} icon={<PeopleIcon color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Pending Registrations" value={stats?.pendingRegistrations ?? "—"} icon={<PendingActionsIcon color="warning" />} color="warning.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Active Customers" value={stats?.activeCustomers ?? "—"} icon={<CheckCircleOutlineIcon color="success" />} color="success.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Disabled Customers" value={stats?.disabledCustomers ?? "—"} icon={<BlockIcon color="error" />} color="error.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Monthly Revenue" value={stats ? formatCurrency(stats.revenueThisMonth) : "—"} icon={<AttachMoneyIcon color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard title="Pending Payments" value={stats?.pendingPayments ?? "—"} icon={<PaymentIcon color="secondary" />} color="secondary.main" />
        </Grid>
      </Grid>
    </>
  );
}
