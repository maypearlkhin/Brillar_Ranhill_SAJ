"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { getMyProfile, updateMyProfile } from "@/services/dataService";
import type { User } from "@/types/auth";
import { PageHeader } from "@/components/ui/DashboardUI";

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setProfile(data);
        setForm({ fullName: data.fullName, phone: data.phone, address: data.address });
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const updated = await updateMyProfile(form);
      setProfile(updated);
      setMessage("Profile updated successfully.");
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Update failed");
    }
  };

  const planName =
    profile?.waterPlan && typeof profile.waterPlan === "object" ? profile.waterPlan.name : "—";

  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your account information." />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid", borderColor: "divider", textAlign: "center" }}>
            <Avatar sx={{ width: 72, height: 72, mx: "auto", bgcolor: "primary.main", fontSize: "1.75rem" }}>
              {profile?.fullName?.charAt(0) ?? <PersonOutlineIcon />}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
              {profile?.fullName ?? "—"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {profile?.email}
            </Typography>
            <Stack spacing={1} sx={{ mt: 2.5, textAlign: "left" }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Meter number</Typography>
                <Typography variant="body1" fontWeight={600}>{profile?.meterNumber ?? "—"}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Water plan</Typography>
                <Typography variant="body1" fontWeight={600}>{planName}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Account status</Typography>
                <Typography variant="body1" fontWeight={600} sx={{ textTransform: "capitalize" }}>
                  {profile?.status ?? "—"}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Edit details
            </Typography>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Email" value={profile?.email ?? ""} disabled fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Meter number" value={profile?.meterNumber ?? ""} disabled fullWidth />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start", px: 3 }}>
                Save changes
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
