import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <Box
      sx={{
        maxWidth: 640,
        marginX: align === "center" ? "auto" : 0,
        textAlign: align,
        marginBottom: { xs: 3, lg: 5 },
      }}
    >
      {eyebrow ? (
        <Typography
          component="p"
          variant="overline"
          color="secondary.main"
          sx={{ display: "block", marginBottom: 1 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography component="h2" variant="h2" color="primary.dark" sx={{ marginBottom: description ? 1.5 : 0 }}>
        {title}
      </Typography>
      {description ? (
        <Typography component="p" variant="body1" color="text.secondary">
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
