import type { PaletteOptions } from "@mui/material/styles";

/**
 * Brand colors sampled from ranhillsaj.com.my: a deep water-blue as the
 * primary corporate color and a warm red-orange accent taken from the
 * Ranhill logotype, used sparingly for calls to action and highlights.
 */
export const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#0B3C5D",
    light: "#3E6E96",
    dark: "#062842",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#E4572E",
    light: "#EF7F5B",
    dark: "#B93E1C",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#182B3A",
    secondary: "#5A6B7B",
  },
  divider: "#E3E8ED",
  info: {
    main: "#2E86AB",
  },
  success: {
    main: "#2E9E5B",
  },
  warning: {
    main: "#F2A93B",
  },
  error: {
    main: "#D32F2F",
  },
};

export const surfaceColors = {
  lightBlue: "#F1F6FA",
  lightGray: "#F6F7F9",
  darkOverlay: "rgba(6, 26, 43, 0.55)",
};
