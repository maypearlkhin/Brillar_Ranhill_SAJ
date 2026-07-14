"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import DashboardSidebar, { DRAWER_WIDTH } from "@/components/layouts/DashboardSidebar";

interface DashboardLayoutShellProps {
  portalLabel: string;
  sidebarItems: { label: string; href: string; icon: React.ReactNode }[];
  children: ReactNode;
  extra?: ReactNode;
}

export default function DashboardLayoutShell({
  portalLabel,
  sidebarItems,
  children,
  extra,
}: DashboardLayoutShellProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#FAFBFC" }}>
      <DashboardSidebar portalLabel={portalLabel} items={sidebarItems} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          p: { xs: 1.5, sm: 2, md: 2.5 },
          pt: { xs: 7, md: 2.5 },
        }}
      >
        {children}
      </Box>
      {extra}
    </Box>
  );
}
