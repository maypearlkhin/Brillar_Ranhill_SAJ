"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function AboutSection() {
  return (
    <Box component="section" sx={{ background: "#FFFFFF", py: { xs: 2, md: 3 } }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 } }}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
          }}
        >
        <Grid container alignItems="stretch">
          <Grid size={{ xs: 12, lg: 6 }}>
            <RevealOnScroll>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 300, md: 400, lg: 500 },
                }}
              >
                <Image
                  src="/images/about-forest-lake.png"
                  alt="Ranhill SAJ forest and lake"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </RevealOnScroll>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <RevealOnScroll delayMs={100}>
              <Box sx={{ p: { xs: 4, md: 6, lg: 8 }, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <Typography component="p" variant="h4" sx={{ fontWeight: 800, color: "primary.dark", mb: 0.5 }}>
                  We Are
                </Typography>
                <Typography component="h2" variant="h2" sx={{ fontWeight: 800, color: "primary.dark", mb: 3, fontSize: { xs: "3rem", md: "4.5rem" } }}>
                  Ranhill <Box component="span" sx={{ color: "secondary.main" }}>SAJ</Box>
                </Typography>
                <Typography component="p" variant="body1" sx={{ color: "text.primary", mb: 5, lineHeight: 1.8, fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
                  Ranhill SAJ manages and operates 47 water treatment plants (WTPs)
                  with a combined treatment capacity of 2,351 million litres per day (MLD).
                  Supporting this operation is an extensive infrastructure network that
                  includes 724 reservoirs and approximately 24,300 kilometres of
                  pipelines.
                </Typography>
                <Box>
                  <Button
                    component={Link}
                    href="/about-us"
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowRightAltIcon sx={{ fontSize: "1.5rem !important" }} />}
                    sx={{
                      borderRadius: 999,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      "&:hover": {
                        backgroundColor: "secondary.main",
                        color: "white",
                      }
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            </RevealOnScroll>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </Box>
  );
}
