import { Grid } from "@mui/material";
import SectionContainer from "@/components/ui/SectionContainer";
import StatCounter from "@/components/ui/StatCounter";
import { statsItems } from "@/lib/site-content";

export default function StatsSection() {
  return (
    <SectionContainer background="linear-gradient(120deg, #0B3C5D 0%, #062842 100%)">
      <Grid container spacing={{ xs: 4, md: 3 }}>
        {statsItems.map((stat) => (
          <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
            <StatCounter stat={stat} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
