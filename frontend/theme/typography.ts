import type { TypographyVariantsOptions } from "@mui/material/styles";

export const typography: TypographyVariantsOptions = {
  fontFamily: "var(--font-body), 'Roboto', 'Helvetica Neue', Arial, sans-serif",
  h1: {
    fontFamily: "var(--font-heading), 'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "3rem",
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
  },
  h2: {
    fontFamily: "var(--font-heading), 'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "2.25rem",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: "var(--font-heading), 'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "1.75rem",
    lineHeight: 1.25,
  },
  h4: {
    fontFamily: "var(--font-heading), 'Roboto', sans-serif",
    fontWeight: 600,
    fontSize: "1.375rem",
    lineHeight: 1.3,
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: 1.35,
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.4,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: "1.05rem",
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.7,
  },
  body2: {
    fontSize: "0.9rem",
    lineHeight: 1.65,
  },
  button: {
    fontWeight: 600,
    textTransform: "none",
  },
  overline: {
    fontWeight: 700,
    letterSpacing: "0.08em",
  },
};
