"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { AuthShell, BackToHomeLink } from "@/components/ui/DashboardUI";

export default function LoginPage() {
  const { login, isAuthenticated, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      window.location.href = user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
    }
  }, [isAuthenticated, isLoading, user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Login failed. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your billing, payments and account services."
      footer={
        <BackToHomeLink />
      }
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={1.5}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Email" type="email" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={submitting} sx={{ mt: 1, py: 1.25, fontWeight: 600 }}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </Stack>
      </Box>
    </AuthShell>
  );
}
