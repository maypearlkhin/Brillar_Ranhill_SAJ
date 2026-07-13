"use client";

import { Box, Typography } from "@mui/material";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { formatWithThousandsSeparator } from "@/utils/formatNumber";
import type { StatItem } from "@/types/content";

interface StatCounterProps {
  stat: StatItem;
}

export default function StatCounter({ stat }: StatCounterProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const animatedValue = useCountUp({ end: stat.value, start: isInView, decimals: stat.decimals ?? 0 });

  return (
    <Box ref={ref} sx={{ textAlign: "center", paddingX: 2 }}>
      <Typography
        component="p"
        variant="h2"
        color="common.white"
        sx={{ fontSize: { xs: "2.25rem", md: "2.75rem" }, fontWeight: 700 }}
      >
        {formatWithThousandsSeparator(animatedValue)}
        {stat.suffix}
      </Typography>
      <Typography component="p" variant="body1" sx={{ color: "rgba(255,255,255,0.82)", marginTop: 0.5 }}>
        {stat.label}
      </Typography>
    </Box>
  );
}
