"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { serviceIconMap } from "@/components/ui/icons/ServiceIcons";
import type { NavChildItem } from "@/types/navigation";

interface ServicesMegaMenuProps {
  items: NavChildItem[];
  open: boolean;
}

interface ViewportBleed {
  left: number;
  width: number;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Full-width icon mega menu used by "Services", spanning the full viewport
 * width regardless of where the trigger sits — matching the reference
 * site's edge-to-edge dropdown. Position/width are measured in JS (instead
 * of relying on `100vw`) so the panel never gets clipped or pushed off
 * either side by the scrollbar.
 */
export default function ServicesMegaMenu({ items, open }: ServicesMegaMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [bleed, setBleed] = useState<ViewportBleed | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      return;
    }

    const updateBleed = (): void => {
      const node = rootRef.current;
      const offsetParent = node?.offsetParent as HTMLElement | null;
      if (!offsetParent) {
        return;
      }
      const parentRect = offsetParent.getBoundingClientRect();
      setBleed({ left: -parentRect.left, width: document.documentElement.clientWidth });
    };

    updateBleed();
    window.addEventListener("resize", updateBleed);
    return () => window.removeEventListener("resize", updateBleed);
  }, [open]);

  return (
    <Box
      ref={rootRef}
      role="menu"
      sx={{
        position: "absolute",
        top: "100%",
        left: bleed ? `${bleed.left}px` : 0,
        width: bleed ? `${bleed.width}px` : "100%",
        backgroundColor: "common.white",
        borderTop: "1px solid",
        borderColor: "divider",
        boxShadow: "0 20px 36px -16px rgba(15, 23, 42, 0.16)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s, left 0s, width 0s",
        pointerEvents: open ? "auto" : "none",
        zIndex: 20,
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          maxWidth: 1240,
          marginX: "auto",
          paddingX: { xs: 3, lg: 4 },
          paddingY: { xs: 3, lg: 3.5 },
        }}
      >
        {items.map((child) => {
          const Icon = child.icon ? serviceIconMap[child.icon] : null;
          return (
            <Box
              key={child.href}
              component={Link}
              href={child.href}
              role="menuitem"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                textDecoration: "none",
                color: "#222222",
                width: { xs: "33%", sm: "20%", lg: `${100 / items.length}%` },
                paddingX: 1.5,
                paddingY: 1,
                "&:hover .service-icon": {
                  color: "secondary.dark",
                  transform: "scale(1.06)",
                },
                "&:hover .service-label": {
                  color: "secondary.main",
                },
              }}
            >
              {Icon ? (
                <Box
                  className="service-icon"
                  sx={{
                    color: "secondary.main",
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  <Icon width={44} height={44} />
                </Box>
              ) : null}
              <Typography
                className="service-label"
                component="span"
                variant="body2"
                sx={{
                  marginTop: 1.25,
                  fontSize: "0.85rem",
                  lineHeight: 1.35,
                  color: "inherit",
                  transition: "color 0.2s ease",
                }}
              >
                {child.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
