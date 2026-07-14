"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

interface BrandLogoProps {
  href?: string;
  width?: number;
  height?: number;
  showTagline?: boolean;
}

export default function BrandLogo({
  href = "/",
  width = 132,
  height = 36,
  showTagline = false,
}: BrandLogoProps) {
  const logo = (
    <Box sx={{ display: "inline-flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ position: "relative", width, height, flexShrink: 0 }}>
        <Image
          src="/images/ranhill-saj-logo.png"
          alt="Ranhill SAJ"
          fill
          sizes={`${width}px`}
          style={{ objectFit: "contain", objectPosition: "left center" }}
          priority
        />
      </Box>
      {showTagline && (
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em", fontSize: "0.7rem" }}>
          Water Supply & Billing
        </Typography>
      )}
    </Box>
  );

  if (!href) return logo;

  return (
    <Box component={Link} href={href} aria-label="Ranhill SAJ home" sx={{ textDecoration: "none", display: "inline-flex" }}>
      {logo}
    </Box>
  );
}
