"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import BrandLogo from "@/components/ui/BrandLogo";

interface StatCardProps {
  title: string;
  value: string | number | ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
}

export function StatCard({ title, value, subtitle, icon, color = "text.primary" }: StatCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.65rem" }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color, mt: 0.5, lineHeight: 1.3 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && <Box sx={{ opacity: 0.7, "& .MuiSvgIcon-root": { fontSize: 20 } }}>{icon}</Box>}
        </Stack>
      </CardContent>
    </Card>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={1}
      sx={{ mb: 2, pb: 1.5, borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Stack>
  );
}

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#FAFBFC" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "44%",
          maxWidth: 520,
          flexDirection: "column",
          justifyContent: "space-between",
          p: 4,
          position: "relative",
          color: "common.white",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/hero-hands-water.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(11, 60, 93, 0.82)" }} />
        <Box sx={{ position: "relative" }}>
          <BrandLogo width={148} height={40} showTagline />
        </Box>
        <Box sx={{ position: "relative" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 320, lineHeight: 1.25 }}>
            Your water account, online.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 340, lineHeight: 1.7, opacity: 0.92 }}>
            Sign in to view billing, submit payments, and manage your Ranhill SAJ customer account securely.
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ position: "relative", opacity: 0.8 }}>
          © Ranhill SAJ
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 5 },
          py: 4,
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" }, mb: 3 }}>
          <BrandLogo width={128} height={34} />
        </Box>

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            p: { xs: 2.5, sm: 3 },
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
              {subtitle}
            </Typography>
          )}
          {children}
          {footer && <Box sx={{ mt: 2.5, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>{footer}</Box>}
        </Paper>
      </Box>
    </Box>
  );
}

/** @deprecated Use contained Button — kept for minimal migration */
export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
      sx={{ fontWeight: 600, ...props.sx }}
    />
  );
}

export const GradientButton = PrimaryButton;

export function BackToHomeLink() {
  return (
    <Typography
      component={Link}
      href="/"
      variant="caption"
      sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.main" } }}
    >
      ← Home
    </Typography>
  );
}

export function formatCurrency(amount: number) {
  return `RM ${amount.toFixed(2)}`;
}

export function WaterStatusBadge({ status }: { status: "on" | "off" }) {
  const isOn = status === "on";
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: isOn ? "success.main" : "error.main",
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          bgcolor: isOn ? "success.main" : "error.main",
        }}
      />
      {isOn ? "ON" : "OFF"}
    </Box>
  );
}

export function DataPanel({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
      {children}
    </Box>
  );
}
