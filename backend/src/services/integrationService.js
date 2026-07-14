import { Integration, DEFAULT_ATENXION_BACKEND_URL } from "../models/Integration.js";

function formatIntegration(doc) {
  if (!doc) return null;
  return {
    _id: doc._id,
    script: doc.script,
    token: doc.token,
    atenxionBackendUrl: doc.atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function getIntegration() {
  const doc = await Integration.findOne().sort({ createdAt: -1 });
  return formatIntegration(doc);
}

export async function createIntegration({ script, token, atenxionBackendUrl }) {
  const existing = await Integration.findOne();
  if (existing) {
    const error = new Error("An integration already exists. Update or remove it first.");
    error.statusCode = 409;
    throw error;
  }

  const doc = await Integration.create({
    script,
    token: token ?? "",
    atenxionBackendUrl: atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL,
  });
  return formatIntegration(doc);
}

export async function updateIntegration({ script, token, atenxionBackendUrl }) {
  const doc = await Integration.findOne();
  if (!doc) {
    const error = new Error("No integration configured yet.");
    error.statusCode = 404;
    throw error;
  }

  if (typeof script === "string") doc.script = script;
  if (typeof token === "string") doc.token = token;
  if (typeof atenxionBackendUrl === "string" && atenxionBackendUrl.trim()) {
    doc.atenxionBackendUrl = atenxionBackendUrl.trim();
  }
  await doc.save();
  return formatIntegration(doc);
}

export async function deleteIntegration() {
  const doc = await Integration.findOneAndDelete();
  if (!doc) {
    const error = new Error("No integration configured.");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Integration removed." };
}

export async function getPublicIntegration() {
  const doc = await Integration.findOne().sort({ createdAt: -1 });
  if (!doc) {
    return null;
  }

  return {
    script: doc.script,
    token: doc.token,
    atenxionBackendUrl: doc.atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL,
  };
}
