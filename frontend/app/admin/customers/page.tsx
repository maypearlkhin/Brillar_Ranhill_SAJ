"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  getPlans,
  updateCustomer,
} from "@/services/dataService";
import type { User, WaterPlan } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  address: "",
  meterNumber: "",
  waterPlan: "",
  status: "approved",
  waterStatus: "on",
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [plans, setPlans] = useState<WaterPlan[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const [customerData, planData] = await Promise.all([getCustomers(), getPlans()]);
    setCustomers(customerData);
    setPlans(planData);
  }, []);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (customer: User) => {
    setEditing(customer);
    setForm({
      fullName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      password: "",
      address: customer.address,
      meterNumber: customer.meterNumber,
      waterPlan: typeof customer.waterPlan === "object" && customer.waterPlan ? customer.waterPlan._id : "",
      status: customer.status,
      waterStatus: customer.waterStatus,
    });
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload: Record<string, unknown> = { ...form };
      if (editing && !form.password) {
        delete payload.password;
      }
      if (editing) {
        await updateCustomer(editing._id, payload);
      } else {
        await createCustomer(payload);
      }
      setOpen(false);
      await load();
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    await deleteCustomer(id);
    await load();
  };

  const statusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    return "error";
  };

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Manage customer accounts and water supply status."
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Customer
          </Button>
        }
      />

      <Box sx={{ overflowX: "auto", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Water</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.fullName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>
                  {typeof c.waterPlan === "object" && c.waterPlan ? c.waterPlan.name : "—"}
                </TableCell>
                <TableCell>
                  <Chip label={c.status} color={statusColor(c.status)} size="small" />
                </TableCell>
                <TableCell>{c.waterStatus === "on" ? "ON" : "OFF"}</TableCell>
                <TableCell>{formatCurrency(c.currentBalance)}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => openEdit(c)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(c._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Customer" : "Create Customer"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Full Name" fullWidth value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <TextField label="Phone" fullWidth value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <TextField label="Email" fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} helperText={editing ? "Leave blank to keep current password" : ""} />
            <TextField label="Address" fullWidth multiline value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <TextField label="Meter Number" fullWidth value={form.meterNumber} onChange={(e) => setForm({ ...form, meterNumber: e.target.value })} />
            <TextField select label="Water Plan" fullWidth value={form.waterPlan} onChange={(e) => setForm({ ...form, waterPlan: e.target.value })}>
              {plans.map((p) => (
                <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Account Status" fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="disabled">Disabled</MenuItem>
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={form.waterStatus === "on"}
                  onChange={(e) => setForm({ ...form, waterStatus: e.target.checked ? "on" : "off" })}
                />
              }
              label={
                <Typography variant="body2">
                  Water: {form.waterStatus === "on" ? "ON" : "OFF"}
                </Typography>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
