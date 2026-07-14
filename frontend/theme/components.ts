import type { Components, Theme } from "@mui/material/styles";
import { containerMaxWidths } from "./breakpoints";

export const components: Components<Theme> = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        "@media (min-width:1024px)": {
          paddingLeft: 24,
          paddingRight: 24,
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
        padding: "7px 16px",
        fontSize: "0.8125rem",
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "none",
        minHeight: 36,
      },
      sizeSmall: {
        padding: "4px 12px",
        minHeight: 30,
        fontSize: "0.75rem",
      },
      containedPrimary: {
        "&:hover": {
          boxShadow: "none",
        },
      },
      containedSecondary: {
        "&:hover": {
          boxShadow: "none",
        },
      },
      outlined: {
        borderWidth: 1,
        "&:hover": {
          borderWidth: 1,
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 6,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(11, 60, 93, 0.06)",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        borderRadius: 8,
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
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        height: 24,
        fontSize: "0.7rem",
        fontWeight: 600,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: "12px 16px",
        fontSize: "0.875rem",
      },
      head: {
        fontWeight: 600,
        fontSize: "0.875rem",
        backgroundColor: "#FAFBFC",
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: "8px 12px",
        fontSize: "0.8125rem",
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
};
