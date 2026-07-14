"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Breadcrumbs, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import type { MarketingPageData } from "@/lib/marketing-pages";

interface MarketingPageLayoutProps extends MarketingPageData {}

export default function MarketingPageLayout({
  title,
  subtitle,
  bannerImage,
  breadcrumb,
  sections,
  highlights,
}: MarketingPageLayoutProps) {
  return (
    <Box component="article">
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 220, md: 300 },
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <Image src={bannerImage} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,26,43,0.25) 0%, rgba(6,26,43,0.75) 100%)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 4, md: 5 }, color: "common.white" }}>
          <Breadcrumbs sx={{ mb: 1, "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.7)" } }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.875rem" }}>
              Home
            </Link>
            {breadcrumb ? (
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>{breadcrumb}</Typography>
            ) : (
              <Typography variant="body2" sx={{ color: "common.white", fontWeight: 600 }}>{title}</Typography>
            )}
          </Breadcrumbs>
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.75rem", md: "2.25rem" }, lineHeight: 1.2 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, maxWidth: 640, opacity: 0.92, fontSize: "1.05rem" }}>
            {subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        {highlights && highlights.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {highlights.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "#F8FAFC" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mt: 0.5 }}>
                    {item.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Stack spacing={3}>
          {sections.map((section) => (
            <Paper key={section.heading} elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mb: 1.5 }}>
                {section.heading}
              </Typography>
              <Stack spacing={1.5}>
                {section.body.map((paragraph) => (
                  <Typography key={paragraph.slice(0, 40)} variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: "0.95rem" }}>
                    {paragraph}
                  </Typography>
                ))}
              </Stack>
              {section.bullets && (
                <Box component="ul" sx={{ mt: 2, pl: 2.5, color: "text.secondary", "& li": { mb: 0.75, lineHeight: 1.6 } }}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Typography variant="body1" component="span" sx={{ fontSize: "0.95rem" }}>{bullet}</Typography>
                    </li>
                  ))}
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
