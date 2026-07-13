"use client";

import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";

interface LogoProps {
  variant?: "dark" | "light";
}

/**
 * Text-based reconstruction of the Ranhill SAJ wordmark (no proprietary
 * logo asset is bundled). Colors and proportions mirror the real mark:
 * a bold "Ranhill" wordmark with an orange accent glyph and a smaller
 * "saj" tagline.
 */
export default function Logo({ variant = "dark" }: LogoProps) {
  const textColor = variant === "dark" ? "primary.dark" : "common.white";

  return (
    <Box component={Link} href="/" aria-label="Ranhill SAJ home" sx={{ display: "inline-flex", textDecoration: "none" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: "18px solid transparent",
            borderBottom: "18px solid transparent",
            borderLeft: "16px solid",
            borderLeftColor: "secondary.main",
            transition: "transform 0.3s ease",
          }}
        />
        <Stack spacing={-0.3}>
          <Typography
            component="span"
            sx={{
              fontFamily: "var(--font-heading), sans-serif",
              fontWeight: 800,
              fontSize: { xs: "1.35rem", md: "1.6rem" },
              lineHeight: 1,
              color: textColor,
              letterSpacing: "-0.01em",
            }}
          >
            Ranhill
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "secondary.main",
              textTransform: "uppercase",
            }}
          >
            SAJ
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
