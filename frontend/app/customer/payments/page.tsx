"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getPayments, getMyBilling, submitPayment } from "@/services/dataService";
import type { Payment } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [balance, setBalance] = useState(0);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const [paymentData, billing] = await Promise.all([getPayments(), getMyBilling()]);
    setPayments(paymentData);
    setBalance(billing.customer.currentBalance);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const handlePay = async (event: FormEvent) => {
    event.preventDefault();
    if (balance <= 0) {
      setError("No outstanding balance to pay.");
      return;
    }
    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      await submitPayment(balance, screenshot ?? undefined);
      setMessage("Payment submitted — pending admin approval.");
      setScreenshot(null);
      await load();
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    return "error";
  };

  return (
    <>
      <PageHeader title="Payments" subtitle="Submit payment and view history." />

      <Box
        component="form"
        onSubmit={handlePay}
        sx={{ mb: 2, p: 2, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Pay now</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
          Balance due: {formatCurrency(balance)}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 1 }}>{message}</Alert>}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
          <Button variant="outlined" component="label" size="small">
            Attach screenshot
            <input type="file" hidden accept="image/*" onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)} />
          </Button>
          {screenshot && <Typography variant="caption">{screenshot.name}</Typography>}
          <Button type="submit" variant="contained" size="small" disabled={submitting || balance <= 0}>
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        </Stack>
      </Box>

      <Box sx={{ overflowX: "auto", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{formatCurrency(p.amount)}</TableCell>
                <TableCell>{new Date(p.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={p.status === "approved" ? "Paid" : p.status} color={statusColor(p.status)} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
