import api from "./api";
import type {
  LoginResponse,
  RegisterPayload,
  User,
  WaterPlan,
} from "@/types/auth";

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
  return data;
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await api.post<{ message: string; user: User }>("/auth/register", payload);
  return data;
}

export async function getProfileRequest() {
  const { data } = await api.get<User>("/auth/profile");
  return data;
}

export async function getActivePlansRequest() {
  const { data } = await api.get<WaterPlan[]>("/auth/plans");
  return data;
}
