"use client";

import Link from "next/link";
import { Button, Grid, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionContainer from "@/components/ui/SectionContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsCard from "@/components/ui/NewsCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { newsItems } from "@/lib/site-content";

export default function NewsSection() {
  return (
    <SectionContainer background="#F6F7F9">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        sx={{ marginBottom: { xs: 3, lg: 4 } }}
      >
        <SectionHeading eyebrow="News & Events" title="What's New" />
        <Button
          component={Link}
          href="/media/news-events"
          variant="text"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ marginBottom: { xs: 2, sm: 5 } }}
        >
          View All
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {newsItems.map((news, index) => (
          <Grid key={news.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RevealOnScroll delayMs={index * 100}>
              <NewsCard news={news} />
            </RevealOnScroll>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
