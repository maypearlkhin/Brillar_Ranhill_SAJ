"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getCustomerDashboard, getPlans } from "@/services/dataService";
import type { CustomerDashboardStats, WaterPlan } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";

const PLAN_TIERS: Record<string, { tier: string; bestFor: string; whyCost: string }> = {
  "Residential Basic": {
    tier: "Home",
    bestFor: "Typical households",
    whyCost: "Lowest monthly fee. Best if you use under 20 m³/month.",
  },
  Premium: {
    tier: "Home+",
    bestFor: "Larger homes",
    whyCost: "Higher fee but more included usage (40 m³) and cheaper overage rate.",
  },
  Commercial: {
    tier: "Business",
    bestFor: "Shops, offices, F&B",
    whyCost: "Higher fee covers larger meter capacity, 50 m³ included, and business-grade supply reliability.",
  },
  Industrial: {
    tier: "Industrial",
    bestFor: "Factories & plants",
    whyCost: "Highest capacity (200 m³ included). Priced for heavy continuous consumption and infrastructure.",
  },
};

export default function CustomerPlanPage() {
  const [stats, setStats] = useState<CustomerDashboardStats | null>(null);
  const [allPlans, setAllPlans] = useState<WaterPlan[]>([]);

  useEffect(() => {
    Promise.all([getCustomerDashboard(), getPlans()])
      .then(([dashboard, plans]) => {
        setStats(dashboard);
        setAllPlans(plans.filter((p) => p.status === "active"));
      })
      .catch(console.error);
  }, []);

  const plan = stats?.currentPlan;
  const meta = plan ? PLAN_TIERS[plan.name] : null;

  return (
    <>
      <PageHeader title="My Plan" subtitle="Your water supply plan and how pricing works." />

      {plan && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(135deg, #F4F7FA 0%, #FFFFFF 100%)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
            <Box>
              <Chip label={meta?.tier ?? "Plan"} size="small" sx={{ mb: 1, bgcolor: "primary.main", color: "white", fontWeight: 600 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{plan.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 480 }}>
                {plan.description}
              </Typography>
              {meta && (
                <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 1.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 16, color: "primary.main", mt: 0.25 }} />
                  <Typography variant="caption" color="text.secondary">{meta.whyCost}</Typography>
                </Stack>
              )}
            </Box>
            <Grid container spacing={1.5} sx={{ maxWidth: 400 }}>
              <Grid size={6}>
                <Card sx={{ bgcolor: "#F1F8FC" }}>
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Typography variant="caption" color="text.secondary">Monthly fee</Typography>
                    <Typography variant="subtitle1" fontWeight={700} color="primary.main">{formatCurrency(plan.monthlyFee)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card sx={{ bgcolor: "#F2FAF5" }}>
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Typography variant="caption" color="text.secondary">Included</Typography>
                    <Typography variant="subtitle1" fontWeight={700}>{plan.includedUsage} m³</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card sx={{ bgcolor: "#FFF7F4" }}>
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Typography variant="caption" color="text.secondary">Per m³ (overage)</Typography>
                    <Typography variant="subtitle1" fontWeight={700}>{formatCurrency(plan.pricePerM3)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card>
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Typography variant="caption" color="text.secondary">Late fee</Typography>
                    <Typography variant="subtitle1" fontWeight={700}>{formatCurrency(plan.lateFee)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      )}

      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
        <Box sx={{ px: 2, py: 1.5, bgcolor: "#F4F7FA", borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="subtitle2" fontWeight={600}>Plan comparison</Typography>
          <Typography variant="caption" color="text.secondary">
            Commercial & Industrial cost more because they include higher volume, larger meters, and business-grade supply.
          </Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Best for</TableCell>
              <TableCell>Monthly fee</TableCell>
              <TableCell>Included</TableCell>
              <TableCell>Overage / m³</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPlans.map((p) => {
              const isCurrent = plan?._id === p._id;
              const tier = PLAN_TIERS[p.name];
              return (
                <TableRow key={p._id} sx={isCurrent ? { bgcolor: "#F1F8FC" } : undefined}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" fontWeight={isCurrent ? 700 : 500}>{p.name}</Typography>
                      {isCurrent && <Chip label="Yours" size="small" color="primary" />}
                    </Stack>
                  </TableCell>
                  <TableCell>{tier?.bestFor ?? "—"}</TableCell>
                  <TableCell>{formatCurrency(p.monthlyFee)}</TableCell>
                  <TableCell>{p.includedUsage} m³</TableCell>
                  <TableCell>{formatCurrency(p.pricePerM3)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper elevation={0} sx={{ mt: 2, p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "#FFFBF5" }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>How your bill is calculated</Typography>
        <Typography variant="body2" color="text.secondary">
          Every month: <strong>Monthly Fee</strong> + (<strong>Usage</strong> − <strong>Included Usage</strong>) × <strong>Price per m³</strong>.
          Usage within your included allowance only costs the monthly fee.
        </Typography>
      </Paper>
    </>
  );
}
