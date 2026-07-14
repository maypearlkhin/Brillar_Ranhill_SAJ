"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { getReports } from "@/services/dataService";
import type { AdminDashboardStats } from "@/types/auth";
import { PageHeader, StatCard, formatCurrency } from "@/components/ui/DashboardUI";

export default function AdminReportsPage() {
  const [report, setReport] = useState<AdminDashboardStats | null>(null);

  useEffect(() => {
    getReports().then(setReport).catch(console.error);
  }, []);

  return (
    <>
      <PageHeader title="Reports" subtitle="Monthly revenue and customer payment summaries." />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Monthly Revenue" value={report ? formatCurrency(report.revenueThisMonth) : "—"} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Paid Customers" value={report?.paidCustomers ?? "—"} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Pending Payments" value={report?.pendingPayments ?? "—"} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Disabled Customers" value={report?.disabledCustomers ?? "—"} />
        </Grid>
      </Grid>
    </>
  );
}
