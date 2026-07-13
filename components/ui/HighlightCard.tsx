import { Card, CardContent, Typography } from "@mui/material";
import type { CompanyHighlight } from "@/types/content";

interface HighlightCardProps {
  highlight: CompanyHighlight;
}

export default function HighlightCard({ highlight }: HighlightCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderColor: "divider",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px -24px rgba(11, 60, 93, 0.45)",
          borderColor: "primary.light",
        },
      }}
    >
      <CardContent sx={{ padding: { xs: 3, md: 3.5 } }}>
        <Typography component="h3" variant="h5" color="primary.dark" sx={{ marginBottom: 1.5 }}>
          {highlight.title}
        </Typography>
        <Typography component="p" variant="body2" color="text.secondary">
          {highlight.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
