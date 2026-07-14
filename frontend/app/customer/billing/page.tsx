"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import dayjs, { type Dayjs } from "dayjs";
import DateProvider from "@/providers/DateProvider";
import { getMyBillingHistory } from "@/services/dataService";
import type { BillingHistoryResponse, BillingRange } from "@/types/auth";
import { PageHeader, formatCurrency } from "@/components/ui/DashboardUI";
import { downloadBillingPdf, printBillingStatement } from "@/utils/billing-export";

const RANGE_OPTIONS: { value: BillingRange; label: string }[] = [
  { value: "6m", label: "6M" },
  { value: "3m", label: "3M" },
  { value: "2m", label: "2M" },
  { value: "today", label: "This Month" },
  { value: "custom", label: "Custom" },
];

const EXPORT_RANGES: { value: BillingRange; label: string }[] = [
  { value: "6m", label: "Last 6 Months" },
  { value: "3m", label: "Last 3 Months" },
  { value: "2m", label: "Last 2 Months" },
  { value: "today", label: "This Month" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
}

function formatPeriod(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { month: "short", year: "numeric" });
}

function statusChip(status: string) {
  if (status === "paid") return <Chip label="Paid" size="small" sx={{ bgcolor: "#E8F5EE", color: "#1B7A45", fontWeight: 600 }} />;
  if (status === "current") return <Chip label="Current" size="small" sx={{ bgcolor: "#FFF4E5", color: "#B45309", fontWeight: 600 }} />;
  return <Chip label="Unpaid" size="small" color="error" />;
}

function monthToQuery(date: Dayjs | null, end = false) {
  if (!date) return "";
  if (end) return date.endOf("month").format("YYYY-MM-DD");
  return date.startOf("month").format("YYYY-MM-DD");
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
  bg: string;
}

function MetricCard({ title, value, icon, accent, bg }: MetricCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: bg,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: accent }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: accent, opacity: 0.85 }}>{icon}</Box>
      </Stack>
    </Paper>
  );
}

export default function CustomerBillingPage() {
  const [range, setRange] = useState<BillingRange>("6m");
  const [fromMonth, setFromMonth] = useState<Dayjs | null>(dayjs().subtract(5, "month"));
  const [toMonth, setToMonth] = useState<Dayjs | null>(dayjs());
  const [data, setData] = useState<BillingHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
  const [printAnchor, setPrintAnchor] = useState<null | HTMLElement>(null);

  const from = range === "custom" ? monthToQuery(fromMonth) : "";
  const to = range === "custom" ? monthToQuery(toMonth, true) : "";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMyBillingHistory({
        range,
        ...(range === "custom" && from ? { from } : {}),
        ...(range === "custom" && to ? { to } : {}),
      });
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [range, from, to]);

  useEffect(() => {
    if (range === "custom" && (!fromMonth || !toMonth)) return;
    load();
  }, [load, range, fromMonth, toMonth]);

  const fetchForExport = async (exportRange: BillingRange, customFrom?: string, customTo?: string) => {
    return getMyBillingHistory({
      range: exportRange,
      ...(exportRange === "custom" && customFrom ? { from: customFrom } : {}),
      ...(exportRange === "custom" && customTo ? { to: customTo } : {}),
    });
  };

  const handleDownload = async (exportRange: BillingRange, label: string) => {
    setExportAnchor(null);
    const cf = exportRange === "custom" ? from : undefined;
    const ct = exportRange === "custom" ? to : undefined;
    const exportData = exportRange === range && data ? data : await fetchForExport(exportRange, cf, ct);
    downloadBillingPdf(exportData, label);
  };

  const handlePrint = async (exportRange: BillingRange, label: string) => {
    setPrintAnchor(null);
    const cf = exportRange === "custom" ? from : undefined;
    const ct = exportRange === "custom" ? to : undefined;
    const exportData = exportRange === range && data ? data : await fetchForExport(exportRange, cf, ct);
    printBillingStatement(exportData, label);
  };

  return (
    <DateProvider>
      <PageHeader
        title="Billing & Usage"
        subtitle={data ? `Meter ${data.summary.meterNumber} · ${data.customer.fullName}` : "Usage and payment history"}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadOutlinedIcon />}
              onClick={(e) => setExportAnchor(e.currentTarget)}
            >
              Download
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<PrintOutlinedIcon />}
              onClick={(e) => setPrintAnchor(e.currentTarget)}
            >
              Print
            </Button>
          </Stack>
        }
      />

      <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "#F8FAFC" }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={1.5}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={range}
              onChange={(_, v) => v && setRange(v)}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                "& .MuiToggleButton-root": {
                  border: "none",
                  px: 2,
                  py: 0.75,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: "6px !important",
                  mx: 0.25,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                },
              }}
            >
              {RANGE_OPTIONS.map((opt) => (
                <ToggleButton key={opt.value} value={opt.value}>
                  {opt.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>

          {range === "custom" && (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
              <DatePicker
                label="From month"
                views={["year", "month"]}
                value={fromMonth}
                onChange={setFromMonth}
                slotProps={{ textField: { size: "small", sx: { bgcolor: "background.paper", borderRadius: 1 } } }}
              />
              <DatePicker
                label="To month"
                views={["year", "month"]}
                value={toMonth}
                onChange={setToMonth}
                minDate={fromMonth ?? undefined}
                slotProps={{ textField: { size: "small", sx: { bgcolor: "background.paper", borderRadius: 1 } } }}
              />
              <Button variant="contained" size="small" onClick={load} disabled={!fromMonth || !toMonth}>
                Apply
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard title="Total Usage" value={data ? `${data.summary.totalUsage} m³` : "—"} icon={<WaterDropOutlinedIcon />} accent="#2E86AB" bg="#F1F8FC" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard title="Total Billed" value={data ? formatCurrency(data.summary.totalBilled) : "—"} icon={<ReceiptLongOutlinedIcon />} accent="#0B3C5D" bg="#F4F7FA" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard title="Total Paid" value={data ? formatCurrency(data.summary.totalPaid) : "—"} icon={<PaidOutlinedIcon />} accent="#2E9E5B" bg="#F2FAF5" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard title="Current Due" value={data ? formatCurrency(data.summary.currentBalance) : "—"} icon={<AccountBalanceWalletOutlinedIcon />} accent="#E4572E" bg="#FFF7F4" />
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
        <Box sx={{ px: 2, py: 1.25, bgcolor: "#F4F7FA", borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Billing history</Typography>
          <Typography variant="body2" color="text.secondary">
            Meter readings are taken at the start and end of each billing period.
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F7FA" }}>
              <TableCell>Month</TableCell>
              <TableCell>Period start</TableCell>
              <TableCell>Period end</TableCell>
              <TableCell>Meter start</TableCell>
              <TableCell>Meter end</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell>Billed</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Due</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>Loading…</TableCell>
              </TableRow>
            )}
            {!loading && data?.records.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>No records for selected period.</TableCell>
              </TableRow>
            )}
            {data?.records.map((row) => {
              const balance = row.totalAmount - row.paidAmount;
              return (
                <TableRow
                  key={row._id}
                  hover
                  sx={row.status === "current" ? { bgcolor: "#FFFBF5" } : undefined}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{formatPeriod(row.billingPeriod)}</TableCell>
                  <TableCell>{formatDate(row.periodStart ?? row.billingPeriod)}</TableCell>
                  <TableCell>{formatDate(row.periodEnd ?? row.billingPeriod)}</TableCell>
                  <TableCell>{row.meterReadingStart.toLocaleString()} m³</TableCell>
                  <TableCell>{row.meterReadingEnd.toLocaleString()} m³</TableCell>
                  <TableCell>{row.usageM3} m³</TableCell>
                  <TableCell>{formatCurrency(row.totalAmount)}</TableCell>
                  <TableCell>{formatCurrency(row.paidAmount)}</TableCell>
                  <TableCell>{balance > 0 ? formatCurrency(balance) : "—"}</TableCell>
                  <TableCell>{statusChip(row.status)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={() => setExportAnchor(null)}>
        {EXPORT_RANGES.map((opt) => (
          <MenuItem key={opt.value} onClick={() => handleDownload(opt.value, opt.label)}>
            {opt.label}
          </MenuItem>
        ))}
        {range === "custom" && from && to && (
          <MenuItem onClick={() => handleDownload("custom", `${from} to ${to}`)}>
            Custom range (selected)
          </MenuItem>
        )}
      </Menu>

      <Menu anchorEl={printAnchor} open={Boolean(printAnchor)} onClose={() => setPrintAnchor(null)}>
        {EXPORT_RANGES.map((opt) => (
          <MenuItem key={opt.value} onClick={() => handlePrint(opt.value, opt.label)}>
            {opt.label}
          </MenuItem>
        ))}
        {range === "custom" && from && to && (
          <MenuItem onClick={() => handlePrint("custom", `${from} to ${to}`)}>
            Custom range (selected)
          </MenuItem>
        )}
      </Menu>
    </DateProvider>
  );
}
