"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="h3"
      variant="subtitle2"
      sx={{
        color: "secondary.main",
        fontWeight: 700,
        fontSize: "0.85rem",
        textTransform: "uppercase",
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Typography
      component={Link}
      href={href}
      variant="body2"
      sx={{
        color: "text.primary",
        textDecoration: "none",
        fontSize: "0.9rem",
        mb: 1.5,
        display: "block",
        "&:hover": { color: "secondary.main" },
      }}
    >
      {label}
    </Typography>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="footer" sx={{ backgroundColor: "#F4F6F8", pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 }, position: "relative" }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 } }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Left Side: CONTACT */}
          <Grid size={{ xs: 12, lg: 3 }}>
            <FooterHeading>CONTACT</FooterHeading>
            <Box sx={{ mb: 3 }}>
              <Image src="/images/ranhill-saj-logo.png" alt="Ranhill SAJ" width={140} height={42} style={{ objectFit: "contain" }} />
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem", mb: 3, lineHeight: 1.6 }}>
              RANHILL SAJ SDN BHD (199901001818)<br />
              Jalan Garuda, Larkin, 80350 Johor Bahru,<br />
              Johor Darul Takzim, Malaysia.
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccountCircleOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                  1800 88 7474
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem", textDecoration: "underline" }}>
                  +607 224 4040
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PrintOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem", textDecoration: "underline" }}>
                  +607-223 5353
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <AccessTimeOutlinedIcon sx={{ color: "secondary.main", fontSize: 20, mt: 0.2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Monday-Thursday, 8:00am-4:30pm<br />
                    Friday, 8:00am-12:15pm<br />
                    <Box component="span" sx={{ pl: 5.5 }}>12:15pm-2:30pm (Close)</Box><br />
                    <Box component="span" sx={{ pl: 5.5 }}>2:30pm-4:30pm</Box>
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailOutlinedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "text.primary", fontSize: "0.9rem", textDecoration: "underline" }}>
                  customer.care@ranhill.com.my
                </Typography>
              </Stack>
            </Stack>

            <FooterHeading>FOLLOW US</FooterHeading>
            <Stack direction="row" spacing={1.5}>
              <IconButton size="small" sx={{ color: "common.black", p: 0, "&:hover": { color: "secondary.main" } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "common.black", p: 0, "&:hover": { color: "secondary.main" } }}>
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Right Side Columns */}
          <Grid size={{ xs: 12, lg: 8.5 }}>
            <Grid container spacing={3}>
              {/* Column 2: ABOUT US & MEDIA CONNECT & COLLABORATION */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FooterHeading>ABOUT US</FooterHeading>
                <Box sx={{ mb: 4 }}>
                  <FooterLink href="/about-us/company-profile" label="Company Profile" />
                  <FooterLink href="/about-us/board-of-directors" label="Board of Directors" />
                  <FooterLink href="/about-us/organization-structure" label="Organization Structure" />
                  <FooterLink href="/about-us/mission-vision" label="Mission & Vision" />
                  <FooterLink href="/about-us/achievements-awards" label="Achievements & Awards" />
                </Box>

                <FooterHeading>MEDIA CONNECT</FooterHeading>
                <Box sx={{ mb: 4 }}>
                  <FooterLink href="/media/notice-of-disruption" label="Notice of Disruption" />
                </Box>

                <FooterHeading>COLLABORATION</FooterHeading>
                <Stack direction="row" spacing={2.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ rowGap: 2.5 }}>
                  <Image src="/images/partners/malaysia-crest.png" alt="Malaysia Crest" width={64} height={52} style={{ objectFit: "contain" }} />
                  <Image src="/images/partners/johor-crest.png" alt="Johor Crest" width={64} height={52} style={{ objectFit: "contain" }} />
                  <Image src="/images/partners/ranhill-logo.png" alt="Ranhill" width={64} height={52} style={{ objectFit: "contain" }} />
                  <Image src="/images/partners/span-logo.png" alt="SPAN" width={80} height={32} style={{ objectFit: "contain" }} />
                  <Image src="/images/partners/paab-logo.png" alt="PAAB" width={64} height={52} style={{ objectFit: "contain" }} />
                </Stack>
              </Grid>

              {/* Column 3: OUR SERVICES */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FooterHeading>OUR SERVICES</FooterHeading>
                <Box>
                  <FooterLink href="/services/application" label="Application for Water Supply" />
                  <FooterLink href="/services/termination" label="Termination of Water Supply" />
                  <FooterLink href="/services/reconnection" label="Reconnection of Water Supply" />
                  <FooterLink href="/services/meter-testing" label="Request Water Meter Testing" />
                  <FooterLink href="/services/installment" label="Installment" />
                  <FooterLink href="/services/change-tariff" label="Change Tariff" />
                </Box>
              </Grid>

              {/* Column 4: CUSTOMER SERVICE */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FooterHeading>CUSTOMER SERVICE</FooterHeading>
                <Box>
                  <FooterLink href="/contact-us" label="Contact Us" />
                  <FooterLink href="/sajic" label="SAJ Info Centre (SAJIC)" />
                  <FooterLink href="/report-problem" label="Report a Problem" />
                  <FooterLink href="/faq" label="FAQ" />
                </Box>
              </Grid>

              {/* Column 5: GENERAL INFORMATION */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FooterHeading>GENERAL INFORMATION</FooterHeading>
                <Box>
                  <FooterLink href="/info/water-tariff" label="Water Tariff" />
                  <FooterLink href="/info/water-saving-tips" label="Water Saving Tips" />
                  <FooterLink href="/info/customer-charter" label="Customer Charter" />
                  <FooterLink href="/info/privacy-notice" label="Privacy Notice" />
                  <FooterLink href="/info/policy-statement" label="Policy Statement" />
                  <FooterLink href="/info/development-plan" label="Development Plan Submission Guidelines" />
                  <FooterLink href="/info/tender" label="Tender" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ mt: 8, pt: 4, borderTop: "1px solid", borderColor: "rgba(0,0,0,0.08)" }}>
        <Container maxWidth={false} disableGutters sx={{ px: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "center" }}
            spacing={3}
          >
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "1rem" }}>
              Copyright &copy; Ranhill SAJ Sdn Bhd. All Rights Reserved.
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="center">
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "1rem", fontWeight: 600, mr: 1 }}>
                WE ACCEPT
              </Typography>
              <Image src="/images/payment/payment-methods-new.png" alt="Payment Methods" width={480} height={60} style={{ objectFit: "contain" }} />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          backgroundColor: "common.white",
          color: "common.black",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
}
