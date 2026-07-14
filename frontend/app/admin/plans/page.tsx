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
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createPlan, deletePlan, getPlans, updatePlan } from "@/services/dataService";
import type { WaterPlan, PlanStatus } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";

const emptyPlan: {
  name: string;
  description: string;
  monthlyFee: number;
  pricePerM3: number;
  includedUsage: number;
  lateFee: number;
  status: PlanStatus;
} = {
  name: "",
  description: "",
  monthlyFee: 0,
  pricePerM3: 0,
  includedUsage: 0,
  lateFee: 0,
  status: "active",
};

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<WaterPlan[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<WaterPlan | null>(null);
  const [form, setForm] = useState(emptyPlan);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setPlans(await getPlans());
  }, []);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyPlan);
    setOpen(true);
  };

  const openEdit = (plan: WaterPlan) => {
    setEditing(plan);
    setForm({
      name: plan.name,
      description: plan.description,
      monthlyFee: plan.monthlyFee,
      pricePerM3: plan.pricePerM3,
      includedUsage: plan.includedUsage,
      lateFee: plan.lateFee,
      status: plan.status,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updatePlan(editing._id, form);
      } else {
        await createPlan(form);
      }
      setOpen(false);
      await load();
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Save failed");
    }
  };

  return (
    <>
      <PageHeader
        title="Water Plans"
        subtitle="Create and manage water supply plans."
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Plan
          </Button>
        }
      />

      <Box sx={{ overflowX: "auto", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Monthly Fee</TableCell>
              <TableCell>Per m³</TableCell>
              <TableCell>Included</TableCell>
              <TableCell>Late Fee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{formatCurrency(p.monthlyFee)}</TableCell>
                <TableCell>{formatCurrency(p.pricePerM3)}</TableCell>
                <TableCell>{p.includedUsage} m³</TableCell>
                <TableCell>{formatCurrency(p.lateFee)}</TableCell>
                <TableCell>
                  <Chip label={p.status} color={p.status === "active" ? "success" : "default"} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => openEdit(p)}>Edit</Button>
                  <Button size="small" color="error" onClick={async () => { await deletePlan(p._id); await load(); }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Plan" : "Create Plan"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Name" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Description" fullWidth multiline value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <TextField label="Monthly Fee" type="number" fullWidth value={form.monthlyFee} onChange={(e) => setForm({ ...form, monthlyFee: Number(e.target.value) })} />
            <TextField label="Price Per m³" type="number" fullWidth value={form.pricePerM3} onChange={(e) => setForm({ ...form, pricePerM3: Number(e.target.value) })} />
            <TextField label="Included Usage (m³)" type="number" fullWidth value={form.includedUsage} onChange={(e) => setForm({ ...form, includedUsage: Number(e.target.value) })} />
            <TextField label="Late Fee" type="number" fullWidth value={form.lateFee} onChange={(e) => setForm({ ...form, lateFee: Number(e.target.value) })} />
            <TextField select label="Status" fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PlanStatus })}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
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
