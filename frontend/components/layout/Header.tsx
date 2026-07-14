"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NavLink from "@/components/layout/NavLink";
import MobileNavDrawer from "@/components/layout/MobileNavDrawer";
import { headerNavItems } from "@/lib/site-content";

const ICON_COLOR = "#575757";
const ICON_HOVER_COLOR = "#333333";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            paddingX: { xs: 2.5, sm: 3, lg: 3.5, xl: 4 },
            minHeight: { xs: 64, lg: 80 },
            gap: { lg: 1.5 },
          }}
        >
          <Box
            component={Link}
            href="/"
            aria-label="Ranhill SAJ home"
            sx={{ position: "relative", display: "inline-flex", flexShrink: 0, width: { xs: 140, lg: 158 }, height: { xs: 38, lg: 48 } }}
          >
            <Image src="/images/ranhill-saj-logo.png" alt="Ranhill SAJ" fill sizes="160px" style={{ objectFit: "contain" }} priority />
          </Box>

          <Stack
            component="nav"
            direction="row"
            sx={{
              display: { xs: "none", lg: "flex" },
              alignSelf: "stretch",
              flexGrow: 1,
              minWidth: 0,
              alignItems: "stretch",
            }}
          >
            {headerNavItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </Stack>

          <Box sx={{ flexGrow: { xs: 1, lg: 0 } }} />

          <Stack direction="row" spacing={{ xs: 1, lg: 3 }} alignItems="center" sx={{ flexShrink: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{ display: { xs: "none", xl: "flex" }, color: ICON_COLOR, whiteSpace: "nowrap" }}
            >
              <SupportAgentOutlinedIcon fontSize="medium" />
              <Stack spacing={-0.2}>
                <Typography component="span" variant="caption" sx={{ fontSize: "0.85rem", color: "text.secondary", lineHeight: 1 }}>
                  Hotline
                </Typography>
                <Typography
                  component="a"
                  href="tel:1800887474"
                  variant="body2"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: ICON_COLOR,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": { color: ICON_HOVER_COLOR },
                  }}
                >
                  1800 88 7474
                </Typography>
              </Stack>
            </Stack>

            <Button
              component={Link}
              href="/login"
              aria-label="Login"
              variant="contained"
              color="secondary"
              startIcon={<AccountCircleOutlinedIcon fontSize="small" />}
              sx={{
                display: { xs: "none", lg: "inline-flex" },
                paddingX: 2,
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Login
            </Button>

            <IconButton
              aria-label="My Account"
              component={Link}
              href="/login"
              sx={{ display: { xs: "inline-flex", lg: "none" }, color: ICON_COLOR }}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ display: { xs: "inline-flex", lg: "none" }, color: ICON_COLOR }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <MobileNavDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} items={headerNavItems} />
    </>
  );
}
