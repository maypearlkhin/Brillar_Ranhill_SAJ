import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { breakpoints } from "./breakpoints";
import { components } from "./components";

const baseTheme = createTheme({
  palette,
  typography,
  breakpoints,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components,
});

export const theme = responsiveFontSizes(baseTheme, { factor: 2.5 });

export default theme;
