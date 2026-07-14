import { Box, Container } from "@mui/material";
import ImageSlider from "@/components/ui/ImageSlider";
import AnnouncementsBar from "@/components/ui/AnnouncementsBar";
import { heroSlides } from "@/lib/site-content";

export default function HeroSection() {
  return (
    <Box component="section" aria-label="Hero banner" sx={{ position: "relative", width: "100%", pt: 0, pb: 2 }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 } }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "40vh", sm: "45vh", md: "65vh", lg: "75vh" },
            minHeight: { xs: 250, sm: 300, md: 640, lg: 680 },
            maxHeight: 860,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "primary.dark",
          }}
        >
          <ImageSlider
            images={heroSlides.map((slide) => ({
              id: slide.id,
              src: slide.imageSrc,
              alt: slide.imageAlt,
              href: slide.href,
            }))}
            autoplay
            interval={5000}
            transitionDuration={600}
            loop
          />
        </Box>
      </Container>

      <Container maxWidth={false} disableGutters sx={{ mt: { xs: 3, md: 4 }, px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 } }}>
        <AnnouncementsBar />
      </Container>
    </Box>
  );
}
