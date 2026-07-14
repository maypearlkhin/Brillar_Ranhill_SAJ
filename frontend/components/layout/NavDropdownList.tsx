"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import type { NavChildItem } from "@/types/navigation";

interface NavDropdownListProps {
  items: NavChildItem[];
  open: boolean;
}

/**
 * Simple vertical dropdown panel (About Us / Help Center / Information /
 * Media Rooms): a floating white card with a small pointer arrow, listing
 * plain text links with an orange hover color — matching the reference
 * site's dropdown exactly.
 */
export default function NavDropdownList({ items, open }: NavDropdownListProps) {
  return (
    <Box
      role="menu"
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: "10px",
        width: "max-content",
        maxWidth: 260,
        backgroundColor: "common.white",
        borderRadius: "6px",
        boxShadow: "0 16px 32px -8px rgba(15, 23, 42, 0.18)",
        padding: "20px 24px",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
        pointerEvents: open ? "auto" : "none",
        zIndex: 20,
        "&::before": {
          content: '""',
          position: "absolute",
          top: -5,
          left: 24,
          width: 10,
          height: 10,
          backgroundColor: "common.white",
          transform: "rotate(45deg)",
          boxShadow: "-2px -2px 4px -2px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      {items.map((child) => (
        <Box
          key={child.href}
          component={Link}
          href={child.href}
          role="menuitem"
          sx={{
            display: "block",
            fontSize: "1rem",
            lineHeight: "1.6",
            paddingY: 1,
            color: "#333333",
            textDecoration: "none",
            whiteSpace: "normal",
            transition: "color 0.2s ease",
            "&:hover": { color: "secondary.main" },
          }}
        >
          {child.label}
        </Box>
      ))}
    </Box>
  );
}
