"use client";

import { useState, type MouseEvent } from "react";
import { Box, ListSubheader, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface LanguageOption {
  code: string;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "bm", label: "Bahasa Malaysia" },
];

/**
 * Hover-triggered language switcher, mirroring the reference header's
 * globe icon + current language code + dropdown of available locales.
 */
export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeCode, setActiveCode] = useState("en");
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Box onMouseEnter={handleOpen} onMouseLeave={handleClose} sx={{ position: "relative" }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          cursor: "pointer",
          color: "#575757",
          paddingY: 1,
          transition: "color 0.2s ease",
          "&:hover": { color: "#333333" },
        }}
      >
        <LanguageOutlinedIcon fontSize="medium" />
        <Typography component="span" variant="body2" sx={{ fontWeight: 800, fontSize: "1rem", textTransform: "uppercase" }}>
          {activeCode}
        </Typography>
        <KeyboardArrowDownIcon
          fontSize="medium"
          sx={{ transition: "transform 0.25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{ onMouseLeave: handleClose, dense: true }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: { elevation: 0, variant: "outlined", sx: { marginTop: 1, minWidth: 180, borderColor: "divider" } },
        }}
      >
        <ListSubheader sx={{ lineHeight: 2.5 }}>Language</ListSubheader>
        {languageOptions.map((option) => (
          <MenuItem
            key={option.code}
            selected={option.code === activeCode}
            onClick={() => {
              setActiveCode(option.code);
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
