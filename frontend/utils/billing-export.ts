import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { BillingHistoryResponse } from "@/types/auth";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
}

function formatPeriod(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MY", { month: "long", year: "numeric" });
}

function formatMoney(amount: number) {
  return `RM ${amount.toFixed(2)}`;
}

export function downloadBillingPdf(data: BillingHistoryResponse, rangeLabel: string) {
  const doc = new jsPDF();
  const { customer, summary, records } = data;

  doc.setFontSize(16);
  doc.setTextColor(11, 60, 93);
  doc.text("Ranhill SAJ — Billing Statement", 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Customer: ${customer.fullName}`, 14, 28);
  doc.text(`Meter: ${summary.meterNumber}`, 14, 34);
  doc.text(`Plan: ${customer.waterPlan?.name ?? "—"}`, 14, 40);
  doc.text(`Period: ${rangeLabel}`, 14, 46);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-MY")}`, 14, 52);

  doc.setFontSize(11);
  doc.setTextColor(11, 60, 93);
  doc.text("Summary", 14, 62);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Total Usage: ${summary.totalUsage} m³`, 14, 68);
  doc.text(`Total Billed: ${formatMoney(summary.totalBilled)}`, 14, 74);
  doc.text(`Total Paid: ${formatMoney(summary.totalPaid)}`, 14, 80);
  doc.text(`Current Due: ${formatMoney(summary.currentBalance)}`, 14, 86);

  autoTable(doc, {
    startY: 94,
    head: [["Month", "Start", "End", "Meter Start", "Meter End", "Usage", "Total", "Paid", "Status"]],
    body: records.map((row) => [
      formatPeriod(row.billingPeriod),
      formatDate(row.periodStart ?? row.billingPeriod),
      formatDate(row.periodEnd ?? row.billingPeriod),
      `${row.meterReadingStart} m³`,
      `${row.meterReadingEnd} m³`,
      `${row.usageM3} m³`,
      formatMoney(row.totalAmount),
      formatMoney(row.paidAmount),
      row.status.toUpperCase(),
    ]),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [11, 60, 93], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 120;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Billing formula: Monthly Fee + (Usage − Included Usage) × Price per m³",
    14,
    finalY + 10
  );

  doc.save(`ranhill-billing-${rangeLabel.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

export function printBillingStatement(data: BillingHistoryResponse, rangeLabel: string) {
  const { customer, summary, records } = data;

  const rows = records
    .map(
      (row) => `
      <tr>
        <td>${formatPeriod(row.billingPeriod)}</td>
        <td>${formatDate(row.periodStart ?? row.billingPeriod)}</td>
        <td>${formatDate(row.periodEnd ?? row.billingPeriod)}</td>
        <td>${row.meterReadingStart.toLocaleString()} m³</td>
        <td>${row.meterReadingEnd.toLocaleString()} m³</td>
        <td>${row.usageM3} m³</td>
        <td>${formatMoney(row.totalAmount)}</td>
        <td>${formatMoney(row.paidAmount)}</td>
        <td>${row.status}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Ranhill Billing — ${rangeLabel}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #182B3A; padding: 32px; }
    h1 { color: #0B3C5D; font-size: 20px; margin: 0 0 4px; }
    .meta { font-size: 12px; color: #5A6B7B; margin-bottom: 20px; line-height: 1.6; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .summary div { border: 1px solid #E3E8ED; border-radius: 8px; padding: 12px; }
    .summary strong { display: block; font-size: 11px; color: #5A6B7B; text-transform: uppercase; }
    .summary span { font-size: 18px; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: #0B3C5D; color: white; text-align: left; padding: 8px; }
    td { border-bottom: 1px solid #E3E8ED; padding: 8px; }
    .footer { margin-top: 20px; font-size: 11px; color: #5A6B7B; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>Ranhill SAJ — Billing Statement</h1>
  <div class="meta">
    <div><strong>Customer:</strong> ${customer.fullName}</div>
    <div><strong>Meter:</strong> ${summary.meterNumber} &nbsp;|&nbsp; <strong>Plan:</strong> ${customer.waterPlan?.name ?? "—"}</div>
    <div><strong>Period:</strong> ${rangeLabel} &nbsp;|&nbsp; <strong>Generated:</strong> ${new Date().toLocaleDateString("en-MY")}</div>
  </div>
  <div class="summary">
    <div><strong>Total Usage</strong><span>${summary.totalUsage} m³</span></div>
    <div><strong>Total Billed</strong><span>${formatMoney(summary.totalBilled)}</span></div>
    <div><strong>Total Paid</strong><span>${formatMoney(summary.totalPaid)}</span></div>
    <div><strong>Current Due</strong><span>${formatMoney(summary.currentBalance)}</span></div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Month</th><th>Start</th><th>End</th><th>Meter Start</th><th>Meter End</th><th>Usage</th>
        <th>Total</th><th>Paid</th><th>Status</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">Formula: Monthly Fee + (Usage − Included Usage) × Price per m³</div>
  <script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}
