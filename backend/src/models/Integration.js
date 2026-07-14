import mongoose from "mongoose";

export const DEFAULT_ATENXION_BACKEND_URL = "https://backend.atenxion.ai/api";

const integrationSchema = new mongoose.Schema(
  {
    script: { type: String, required: true, trim: true },
    token: { type: String, default: "", trim: true },
    atenxionBackendUrl: {
      type: String,
      default: DEFAULT_ATENXION_BACKEND_URL,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Integration = mongoose.model("Integration", integrationSchema);
