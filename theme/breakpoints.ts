import type { BreakpointsOptions } from "@mui/material/styles";

/**
 * Breakpoints tuned to match the required support matrix:
 * 360, 480, 768, 1024, 1280, 1440 and 1920 px viewports.
 */
export const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

export const containerMaxWidths = {
  xs: "100%",
  sm: "100%",
  md: "100%",
  lg: "976px",
  xl: "1240px",
};
