"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import type { NavItem } from "@/types/navigation";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMenu = Boolean(item.children?.length);

  if (!item.hasDropdown) {
    return (
      <ListItemButton component={Link} href={item.href} onClick={onNavigate}>
        <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500 } } }} />
      </ListItemButton>
    );
  }

  return (
    <Box>
      <ListItemButton
        onClick={() => setIsExpanded((prev) => !prev)}
        sx={{ justifyContent: "space-between" }}
      >
        <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 500 } } }} />
        {hasMenu ? (
          <ExpandMoreIcon
            fontSize="small"
            sx={{ transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        ) : null}
      </ListItemButton>
      {hasMenu ? (
        <Collapse in={isExpanded} timeout={250} unmountOnExit>
          <List disablePadding>
            {item.children?.map((child) => (
              <ListItemButton key={child.href} component={Link} href={child.href} onClick={onNavigate} sx={{ paddingLeft: 4 }}>
                <ListItemText
                  primary={child.label}
                  slotProps={{ primary: { sx: { color: "text.secondary", fontSize: "0.9rem" } } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </Box>
  );
}

export default function MobileNavDrawer({ open, onClose, items }: MobileNavDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: { xs: "84vw", sm: 360 } } } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <Box sx={{ position: "relative", width: 140, height: 38 }}>
          <Image src="/images/ranhill-saj-logo.png" alt="Ranhill SAJ" fill sizes="140px" style={{ objectFit: "contain" }} />
        </Box>
        <IconButton onClick={onClose} aria-label="Close navigation menu">
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <List sx={{ paddingX: 1, flexGrow: 1 }}>
        {items.map((item) => (
          <MobileNavItem key={item.href} item={item} onNavigate={onClose} />
        ))}
      </List>
      <Divider />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ padding: 2, color: "#575757" }}>
        <SupportAgentOutlinedIcon fontSize="small" />
        <Typography component="a" href="tel:1800887474" variant="body2" sx={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>
          1800 88 7474
        </Typography>
      </Stack>
    </Drawer>
  );
}
