import type { ReactNode } from "react";
import { Box, Container, type SxProps, type Theme } from "@mui/material";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  background?: string;
  disableGutters?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Consistent vertical rhythm + max-width wrapper reused by every landing
 * page section so spacing stays uniform across the page.
 */
export default function SectionContainer({ children, id, background, disableGutters, sx }: SectionContainerProps) {
  return (
    <Box component="section" id={id} sx={{ background, ...sx }}>
      <Container
        maxWidth="xl"
        disableGutters={disableGutters}
        sx={{ paddingY: { xs: 6, md: 8, lg: 10 } }}
      >
        {children}
      </Container>
    </Box>
  );
}
