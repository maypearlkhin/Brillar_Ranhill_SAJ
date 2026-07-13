"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import type { NewsItem } from "@/types/content";

interface NewsCardProps {
  news: NewsItem;
  priority?: boolean;
}

export default function NewsCard({ news, priority = false }: NewsCardProps) {
  return (
    <Card
      component={Link}
      href={news.href}
      elevation={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        borderColor: "divider",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 24px 44px -26px rgba(11, 60, 93, 0.5)",
        },
        "&:hover .news-card-image": {
          transform: "scale(1.08)",
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", paddingTop: "58%", overflow: "hidden" }}>
        <Image
          src={news.imageSrc}
          alt={news.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="news-card-image"
          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
        />
        <Chip
          label={news.category}
          size="small"
          color="secondary"
          sx={{ position: "absolute", top: 16, left: 16, fontWeight: 600 }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography component="span" variant="caption" color="text.secondary">
          {news.date}
        </Typography>
        <Typography component="h3" variant="h5" color="primary.dark" sx={{ fontSize: "1.05rem" }}>
          {news.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
