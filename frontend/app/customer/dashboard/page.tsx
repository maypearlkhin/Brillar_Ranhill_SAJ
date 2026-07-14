"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { getCustomerDashboard, getMyBillingHistory } from "@/services/dataService";
import type { BillingHistoryResponse, CustomerDashboardStats } from "@/types/auth";
import { PageHeader, WaterStatusBadge, formatCurrency } from "@/components/ui/DashboardUI";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
}

function formatPeriod(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { month: "short", year: "numeric" });
}

function SummaryTile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: string;
}) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%" }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, color: accent ?? "text.primary" }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          {sub}
        </Typography>
      )}
    </Paper>
  );
}

export default function CustomerDashboardPage() {
  const [stats, setStats] = useState<CustomerDashboardStats | null>(null);
  const [recentBills, setRecentBills] = useState<BillingHistoryResponse | null>(null);

  useEffect(() => {
    Promise.all([getCustomerDashboard(), getMyBillingHistory({ range: "3m" })])
      .then(([dashboard, history]) => {
        setStats(dashboard);
        setRecentBills(history);
      })
      .catch(console.error);
  }, []);

  const current = stats?.currentBillRecord;

  return (
    <>
      <PageHeader title="Dashboard" subtitle={stats ? `Welcome back, ${stats.fullName}` : "Your water account"} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryTile label="Current Plan" value={stats?.currentPlan?.name ?? "—"} sub="Treated potable water" accent="primary.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryTile label="Amount Due" value={stats ? formatCurrency(stats.currentBalance) : "—"} sub="This billing period" accent="#E4572E" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryTile
            label="Water Supply"
            value={stats ? <WaterStatusBadge status={stats.waterStatus} /> : "—"}
            sub={stats?.waterStatus === "on" ? "Supply active" : "Supply suspended"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryTile
            label="Latest Payment"
            value={stats?.latestPayment ? formatCurrency(stats.latestPayment.amount) : "None"}
            sub={stats?.latestPayment ? `Status: ${stats.latestPayment.status}` : "No payments yet"}
            accent="success.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Current billing period
              </Typography>
            </Stack>

            {current ? (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Period</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatDate(current.periodStart)} — {formatDate(current.periodEnd)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Meter number</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{stats?.meterNumber}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body2" color="text.secondary">Reading at start</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{current.meterReadingStart.toLocaleString()} m³</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body2" color="text.secondary">Reading at end</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{current.meterReadingEnd.toLocaleString()} m³</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body2" color="text.secondary">Usage this period</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{current.usageM3} m³</Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">Bill amount</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                    {formatCurrency(current.totalAmount)}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary">No active billing record.</Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>Quick actions</Typography>
            <Stack spacing={1.25}>
              <Button component={Link} href="/customer/payments" variant="contained" fullWidth startIcon={<PaymentIcon />}>
                Pay bill — {stats ? formatCurrency(stats.currentBalance) : "—"}
              </Button>
              <Button component={Link} href="/customer/billing" variant="outlined" fullWidth startIcon={<SpeedOutlinedIcon />}>
                View usage history
              </Button>
              <Button component={Link} href="/customer/plan" variant="outlined" fullWidth startIcon={<WaterDropIcon />}>
                My plan details
              </Button>
            </Stack>
            <Box sx={{ mt: 2, p: 1.5, bgcolor: "#F4F7FA", borderRadius: 1.5 }}>
              <Typography variant="body2" color="text.secondary">
                All residential and commercial plans supply <strong>treated (clean/potable) water</strong>.
                Untreated water is only used in special industrial cases — not part of this account.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider", bgcolor: "#F8FAFC" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Recent billing (last 3 months)</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentBills?.records.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{formatPeriod(row.billingPeriod)}</TableCell>
                <TableCell>{formatDate(row.periodStart ?? row.billingPeriod)}</TableCell>
                <TableCell>{formatDate(row.periodEnd ?? row.billingPeriod)}</TableCell>
                <TableCell>{row.usageM3} m³</TableCell>
                <TableCell>{formatCurrency(row.totalAmount)}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>{row.status}</TableCell>
              </TableRow>
            ))}
            {!recentBills?.records.length && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>No billing records yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
