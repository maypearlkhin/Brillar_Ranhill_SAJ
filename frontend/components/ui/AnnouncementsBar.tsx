"use client";

import { Box, Stack, Typography, IconButton } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/**
 * Announcements bar shown below the hero banner.
 */
export default function AnnouncementsBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        border: "1px solid",
        borderColor: "secondary.main",
        borderRadius: 999, // Pill shape
        padding: "4px 8px 4px 4px", // Tighter on the left to hug the circle icon
        backgroundColor: "common.white",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "secondary.main",
            color: "common.white",
            flexShrink: 0,
          }}
        >
          <CampaignIcon fontSize="small" />
        </Box>
        
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} spacing={{ xs: 0, sm: 2 }} sx={{ minWidth: 0, overflow: "hidden" }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "secondary.main",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              flexShrink: 0,
            }}
          >
            Announcements
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{
              color: "text.primary",
              fontWeight: 500,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            &quot;DOWNLOAD THE MySAJ 2.0 APP NOW!&quot;
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0, ml: 2 }}>
        <IconButton size="small" sx={{ color: "secondary.main" }}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "secondary.main" }}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}