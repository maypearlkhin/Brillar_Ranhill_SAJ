import type { Components, Theme } from "@mui/material/styles";
import { containerMaxWidths } from "./breakpoints";

export const components: Components<Theme> = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 20,
        paddingRight: 20,
        "@media (min-width:480px)": {
          paddingLeft: 24,
          paddingRight: 24,
        },
        "@media (min-width:1024px)": {
          paddingLeft: 32,
          paddingRight: 32,
        },
      },
    },
    variants: [
      {
        props: { maxWidth: "lg" },
        style: {
          "@media (min-width:1024px)": {
            maxWidth: containerMaxWidths.lg,
          },
        },
      },
      {
        props: { maxWidth: "xl" },
        style: {
          "@media (min-width:1280px)": {
            maxWidth: containerMaxWidths.xl,
          },
        },
      },
    ],
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: "10px 26px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
      },
      containedPrimary: {
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px -8px rgba(11, 60, 93, 0.55)",
        },
      },
      containedSecondary: {
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px -8px rgba(228, 87, 46, 0.55)",
        },
      },
      outlined: {
        borderWidth: 1.5,
        "&:hover": {
          borderWidth: 1.5,
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: "color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
};
