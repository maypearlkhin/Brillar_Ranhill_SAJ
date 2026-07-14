"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LABEL_COLOR = "#182B3A";

export default function WelcomeLoginCard() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        p: 2.5,
      }}
    >
      <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 600, color: LABEL_COLOR }}>
        Customer Portal
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, lineHeight: 1.5 }}>
        Manage billing, payments, and your water account online.
      </Typography>

      <Stack spacing={1.5} sx={{ mt: 2 }}>
        <TextField label="Email" type="email" size="small" fullWidth disabled placeholder="Sign in to continue" />
        <TextField label="Password" type="password" size="small" fullWidth disabled placeholder="••••••••" />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        component={Link}
        href="/login"
        sx={{ mt: 2 }}
      >
        Sign in
      </Button>

      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 1.5 }}>
        <Typography component={Link} href="/login" variant="caption" sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.main" } }}>
          Forgot password
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary">or</Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      <Button fullWidth variant="outlined" color="primary" component={Link} href="/customer/payments">
        Quick payment
      </Button>
    </Box>
  );
}
