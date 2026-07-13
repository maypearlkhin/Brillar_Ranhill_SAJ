"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavDropdownList from "@/components/layout/NavDropdownList";
import ServicesMegaMenu from "@/components/layout/ServicesMegaMenu";
import type { NavItem } from "@/types/navigation";

interface NavLinkProps {
  item: NavItem;
}

const DEFAULT_COLOR = "#000000"; // Changed to black
const HOVER_COLOR = "#E4572E"; // Changed to orange
const ACTIVE_INDICATOR_COLOR = "#E4572E";

/**
 * Single top-level navigation entry. Matches the reference site: a plain
 * color change on hover, an accent underline only on the active route,
 * and — when `children` are populated — a hover-triggered dropdown that
 * opens instantly on mouseenter and closes on mouseleave (no click
 * required). The dropdown presentation (`layout`) is fully data-driven.
 */
export default function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const hasMenu = Boolean(item.children?.length);
  const isOpen = isHovered && hasMenu;
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Top indicator line */}
      <Box
        sx={{
          position: "absolute",
          top: 0, // Move it to the very top of the header
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: ACTIVE_INDICATOR_COLOR,
          opacity: (isActive || isHovered) ? 1 : 0,
          transition: "opacity 0.2s ease",
          zIndex: 1,
        }}
      />
      <Box
        component={Link}
        href={item.href}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.25,
          paddingX: { lg: 0.6, xl: 1.25 },
          whiteSpace: "nowrap",
          flexShrink: 0,
          textDecoration: "none",
          color: isActive ? HOVER_COLOR : (isHovered ? HOVER_COLOR : DEFAULT_COLOR),
          boxSizing: "border-box",
          transition: "color 0.2s ease",
          height: "100%", // Make the link take full height so hover area is large
        }}
      >
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontSize: { lg: "1rem", xl: "1.1rem" }, fontWeight: 800, color: "inherit", whiteSpace: "nowrap" }}
        >
          {item.label}
        </Typography>
        {item.hasDropdown ? (
          <KeyboardArrowDownIcon
            fontSize="small"
            sx={{
              fontSize: { lg: "1.1rem", xl: "1.25rem" },
              transition: "transform 0.25s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        ) : null}
      </Box>

      {hasMenu && item.layout === "mega" ? (
        <ServicesMegaMenu items={item.children ?? []} open={isOpen} />
      ) : hasMenu ? (
        <NavDropdownList items={item.children ?? []} open={isOpen} />
      ) : null}
    </Box>
  );
}
