"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { useInView } from "@/hooks/useInView";

interface RevealOnScrollProps {
  children: ReactNode;
  delayMs?: number;
  yOffset?: number;
}

/**
 * Fades and slides content into place the first time it enters the
 * viewport, using a plain CSS transition (no animation library).
 */
export default function RevealOnScroll({ children, delayMs = 0, yOffset = 24 }: RevealOnScrollProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : `translateY(${yOffset}px)`,
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Box>
  );
}
