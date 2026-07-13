"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(90deg, #1A4B8C 0%, #2962A8 100%)",
        py: { xs: 5, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <RevealOnScroll>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: "common.white",
                fontWeight: 700,
                mb: 1.5,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Clean Water, Clean World: Making A Difference.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 400,
              }}
            >
              Join us in protecting the environment and promoting sustainability.{" "}
              <Box
                component={Link}
                href="/sustainability"
                sx={{
                  color: "common.white",
                  textDecoration: "underline",
                  fontWeight: 500,
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.8)",
                  },
                }}
              >
                Explore More
              </Box>
            </Typography>
          </Box>
        </RevealOnScroll>
      </Container>
    </Box>
  );
}
