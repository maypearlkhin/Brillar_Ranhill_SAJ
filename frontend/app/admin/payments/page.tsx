"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getPayments, updatePaymentStatus } from "@/services/dataService";
import type { Payment, User, WaterPlan } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const load = async () => {
    setPayments(await getPayments());
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const handleStatus = async (id: string, status: string) => {
    await updatePaymentStatus(id, status);
    await load();
  };

  const customerName = (payment: Payment) => {
    const c = payment.customer as User;
    return typeof c === "object" ? c.fullName : "—";
  };

  const planName = (payment: Payment) => {
    const p = payment.plan as WaterPlan;
    return typeof p === "object" && p ? p.name : "—";
  };

  const statusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    return "error";
  };

  return (
    <>
      <PageHeader title="Payments" subtitle="Review and approve customer payment submissions." />

      <Box sx={{ overflowX: "auto", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{customerName(p)}</TableCell>
                <TableCell>{planName(p)}</TableCell>
                <TableCell>{formatCurrency(p.amount)}</TableCell>
                <TableCell>{new Date(p.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={p.status} color={statusColor(p.status)} size="small" />
                </TableCell>
                <TableCell align="right">
                  {p.status === "pending" && (
                    <>
                      <Button size="small" color="success" onClick={() => handleStatus(p._id, "approved")}>
                        Approve
                      </Button>
                      <Button size="small" color="error" onClick={() => handleStatus(p._id, "rejected")}>
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
