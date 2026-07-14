import { Box, Container, Grid, Typography } from "@mui/material";
import QuickAccessTile from "@/components/ui/QuickAccessTile";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { quickAccessItems } from "@/lib/site-content";

export default function QuickAccessSection() {
  return (
    <Box 
      component="section" 
      sx={{ 
        background: `
          radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(244, 246, 248, 0.95) 100%),
          repeating-radial-gradient(
            circle at center,
            transparent 0,
            transparent 60px,
            rgba(0, 0, 0, 0.015) 60px,
            rgba(0, 0, 0, 0.015) 61px
          )
        `,
        backgroundColor: "#F9FAFB",
        pt: { xs: 6, md: 10 }, 
        pb: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Optional subtle background pattern overlay if needed, currently using gradient */}
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 }, position: "relative", zIndex: 1 }}>
        <RevealOnScroll>
          <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: "primary.dark", fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Quick <Box component="span" sx={{ color: "secondary.main" }}>Access</Box>
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            justifyContent="center"
            sx={{ maxWidth: "1200px", mx: "auto" }}
          >
            {quickAccessItems.map((item) => (
              <Grid key={item.href} size={{ xs: 4, sm: 4, md: 2 }}>
                <QuickAccessTile item={item} />
              </Grid>
            ))}
          </Grid>
        </RevealOnScroll>
      </Container>
    </Box>
  );
}
