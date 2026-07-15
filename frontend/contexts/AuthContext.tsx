"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/types/auth";
import { getProfileRequest, loginRequest } from "@/services/authService";
import { sendLoginEvent, sendLogoutEvent } from "@/utils/atenxion-webhook";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  isTokenExpired,
  setStoredToken,
  setStoredUser,
} from "@/utils/auth-storage";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    const currentUser = user ?? getStoredUser<User>();
    const userId = currentUser?._id;

    try {
      if (userId) {
        await sendLogoutEvent(userId);
      }
    } catch {
      // Webhook failure must not block logout.
    } finally {
      clearAuthStorage();
      setUser(null);
      setToken(null);
      window.location.replace("/login");
    }
  }, [user]);

  const refreshProfile = useCallback(async () => {
    const profile = await getProfileRequest();
    setUser(profile);
    setStoredUser(profile);
  }, []);

  useEffect(() => {
    const init = async () => {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser<User>();

      if (!storedToken || isTokenExpired(storedToken)) {
        clearAuthStorage();
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      setUser(storedUser);

      try {
        const profile = await getProfileRequest();
        setUser(profile);
        setStoredUser(profile);
      } catch {
        clearAuthStorage();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    void init();
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        void logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [token, logout]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email, password);

    try {
      if (result.user._id) {
        await sendLoginEvent(result.user._id);
      }
    } catch {
      // Webhook failure must not block login.
    }

    setStoredToken(result.token);
    setStoredUser(result.user);

    window.location.replace(
      result.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard",
    );
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
      refreshProfile,
    }),
    [user, token, isLoading, login, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
