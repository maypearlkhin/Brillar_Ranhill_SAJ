"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import BrandLogo from "@/components/ui/BrandLogo";

const DRAWER_WIDTH = 220;

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  portalLabel: string;
  items: NavItem[];
}

export default function DashboardSidebar({ portalLabel, items }: DashboardSidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user } = useAuth();

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
      <Box sx={{ px: 2, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <BrandLogo href="/" width={120} height={32} />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.6rem" }}>
          {portalLabel}
        </Typography>
      </Box>

      <List dense sx={{ px: 1, py: 1, flex: 1 }}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              onClick={() => setMobileOpen(false)}
              sx={{
                py: 0.75,
                mb: 0.25,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, "& .MuiSvgIcon-root": { fontSize: 18 } }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: "0.8125rem", fontWeight: active ? 600 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ px: 1.5, py: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary" noWrap display="block" sx={{ mb: 0.5, px: 1 }}>
          {user?.fullName}
        </Typography>
        <ListItemButton onClick={() => void logout()} sx={{ py: 0.5, minHeight: 32 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <LogoutOutlinedIcon sx={{ fontSize: 16 }} />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.8125rem" }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            width: 36,
            height: 36,
          }}
        >
          <MenuIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export { DRAWER_WIDTH };
