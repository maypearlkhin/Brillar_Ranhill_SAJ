"use client";

import Link from "next/link";
import { Box, Paper, Typography } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import type { QuickAccessItem } from "@/types/navigation";

const iconMap: Record<QuickAccessItem["icon"], SvgIconComponent> = {
  disruption: WaterDropOutlinedIcon,
  complaint: ErrorOutlineIcon,
  tender: RequestQuoteOutlinedIcon,
  location: MapOutlinedIcon,
  bill: ReceiptLongOutlinedIcon,
  whistle: AdminPanelSettingsOutlinedIcon,
};

interface QuickAccessTileProps {
  item: QuickAccessItem;
}

export default function QuickAccessTile({ item }: QuickAccessTileProps) {
  const Icon = iconMap[item.icon];

  return (
    <Paper
      component={Link}
      href={item.href}
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1.5,
        padding: { xs: 2.5, md: 3.5 },
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px -15px rgba(228, 87, 46, 0.2)",
        },
        "&:hover .quick-access-text": {
          color: "secondary.main",
        },
      }}
    >
      <Box
        className="quick-access-icon"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "secondary.main",
          mb: 0.5,
        }}
      >
        <Icon sx={{ fontSize: 48, strokeWidth: 1.5 }} />
      </Box>
      <Typography className="quick-access-text" component="span" variant="subtitle2" sx={{ fontSize: "0.95rem", fontWeight: 800, color: "text.primary", transition: "color 0.3s ease", lineHeight: 1.3 }}>
        {item.label}
      </Typography>
    </Paper>
  );
}
