"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  createIntegration,
  deleteIntegration,
  getIntegration,
  updateIntegration,
  DEFAULT_ATENXION_BACKEND_URL,
  type IntegrationConfig,
} from "@/services/integrationService";
import { PageHeader } from "@/components/ui/DashboardUI";

const emptyForm = {
  script: "",
  token: "",
  atenxionBackendUrl: DEFAULT_ATENXION_BACKEND_URL,
};

export default function AdminIntegrationPage() {
  const [integration, setIntegration] = useState<IntegrationConfig | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getIntegration();
      setIntegration(data);
      setForm(
        data
          ? {
              script: data.script,
              token: data.token,
              atenxionBackendUrl: data.atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL,
            }
          : emptyForm,
      );
    } catch {
      setError("Failed to load integration settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  const handleSave = async () => {
    setError("");
    setMessage("");

    if (!form.script.trim()) {
      setError("Script is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        script: form.script.trim(),
        token: form.token.trim(),
        atenxionBackendUrl: form.atenxionBackendUrl.trim() || DEFAULT_ATENXION_BACKEND_URL,
      };
      const saved = integration
        ? await updateIntegration(payload)
        : await createIntegration(payload);
      if (!saved) {
        setError("Failed to save integration.");
        return;
      }
      setIntegration(saved);
      setForm({
        script: saved.script,
        token: saved.token,
        atenxionBackendUrl: saved.atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL,
      });
      setMessage(integration ? "Integration updated." : "Integration created.");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Failed to save integration.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!integration) return;
    if (!window.confirm("Remove this integration? The widget will stop loading on the site.")) return;

    setError("");
    setMessage("");
    setSaving(true);
    try {
      await deleteIntegration();
      setIntegration(null);
      setForm(emptyForm);
      setMessage("Integration removed.");
    } catch {
      setError("Failed to remove integration.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Integration"
        subtitle="Configure the external chat widget. Only one integration is allowed at a time."
      />

      <Card sx={{ maxWidth: 720 }}>
        <CardContent sx={{ p: 2.5 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Widget script"
              placeholder='<script src="https://example.com/widget.js"></script>'
              helperText="Paste the full script tag or the widget URL."
              multiline
              minRows={3}
              fullWidth
              value={form.script}
              onChange={(e) => setForm((prev) => ({ ...prev, script: e.target.value }))}
              disabled={loading || saving}
            />
            <TextField
              label="Token"
              placeholder="Widget authentication token"
              helperText="Used as the authorization header for Atenxion webhooks."
              fullWidth
              value={form.token}
              onChange={(e) => setForm((prev) => ({ ...prev, token: e.target.value }))}
              disabled={loading || saving}
            />
            <TextField
              label="Atenxion backend URL"
              placeholder={DEFAULT_ATENXION_BACKEND_URL}
              helperText="Base URL for post-login webhooks (login / logout)."
              fullWidth
              value={form.atenxionBackendUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, atenxionBackendUrl: e.target.value }))}
              disabled={loading || saving}
            />

            {integration && (
              <Typography variant="caption" color="text.secondary">
                Last updated: {new Date(integration.updatedAt).toLocaleString("en-MY")}
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSave}
                disabled={loading || saving}
              >
                {integration ? "Update" : "Save"}
              </Button>
              {integration && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={handleDelete}
                  disabled={loading || saving}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
