"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LABEL_COLOR = "#1A2233";

/**
 * Floating "Welcome To Ranhill SAJ" sign-in / quick-payment widget shown
 * over the hero banner. Presentational only: the form is fully wired for
 * local state (email, password, show-password) but submission is a no-op,
 * since authentication is out of scope for this UI-only build.
 */
export default function WelcomeLoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        backgroundColor: "#F2F4F7",
        borderRadius: 4,
        boxShadow: "0 24px 48px -16px rgba(15, 23, 42, 0.3)",
        paddingX: 3, // 24px
        paddingY: 5, // 40px
      }}
    >
      <Typography component="h2" variant="h5" sx={{ fontWeight: 800, color: LABEL_COLOR }}>
        Welcome To Ranhill SAJ
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "text.secondary", lineHeight: 1.6 }}>
        Everything you need to manage your water supply account, pay your bill, and report any issues. Easy and convenient.
      </Typography>

      <Stack spacing={2} sx={{ marginTop: 3 }}>
        <Box>
          <Typography component="label" htmlFor="wlc-email" variant="body2" sx={{ fontWeight: 600, color: LABEL_COLOR }}>
            Email{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          </Typography>
          <TextField
            id="wlc-email"
            type="email"
            autoComplete="email"
            fullWidth
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{ marginTop: 0.75, backgroundColor: "common.white", borderRadius: 1 }}
            slotProps={{
              htmlInput: { sx: { paddingY: 1.25 } }
            }}
          />
        </Box>

        <Box>
          <Typography component="label" htmlFor="wlc-password" variant="body2" sx={{ fontWeight: 600, color: LABEL_COLOR }}>
            Password{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          </Typography>
          <TextField
            id="wlc-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            size="small"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ marginTop: 0.75, backgroundColor: "common.white", borderRadius: 1 }}
            slotProps={{
              htmlInput: { sx: { paddingY: 1.25 } }
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Show Password
            </Typography>
          }
          sx={{ marginLeft: -0.5, marginTop: -0.5 }}
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          marginTop: 2,
          paddingY: 1.25,
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: 999,
          textTransform: "none",
          background: "linear-gradient(135deg, #F2794A 0%, #E4572E 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #E4572E 0%, #B93E1C 100%)",
          },
        }}
      >
        Sign In
      </Button>

      <Stack direction="row" justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Typography
          component={Link}
          href="/forgot-password"
          variant="body2"
          sx={{
            color: "secondary.main",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Your Password?
        </Typography>
        <Typography
          component={Link}
          href="/create-account"
          variant="body2"
          sx={{
            color: "secondary.main",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Create Account
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ marginTop: 3.5 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 600 }}>
          OR
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      <Typography variant="body2" sx={{ marginTop: 3.5, textAlign: "center", color: "text.primary" }}>
        Skip the queue and pay your water bill easier than ever.
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{
          marginTop: 1.5,
          paddingY: 1.1,
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: 999,
          textTransform: "none",
          backgroundColor: "common.white",
        }}
      >
        Quick Payment
      </Button>
    </Box>
  );
}
