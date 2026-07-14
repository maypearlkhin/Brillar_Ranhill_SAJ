"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { PageHeader } from "@/components/ui/DashboardUI";

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" />
      <Card sx={{ maxWidth: 420 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Default admin
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            admin@ranhill.com
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: "block" }}>
            Single admin account. Not creatable via UI.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
