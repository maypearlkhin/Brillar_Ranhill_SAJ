"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      window.location.replace("/login");
      return;
    }

    if (role && user?.role !== role) {
      router.replace(user?.role === "admin" ? "/admin/dashboard" : "/customer/dashboard");
    }
  }, [isAuthenticated, isLoading, role, router, user]);

  if (isLoading || !isAuthenticated || (role && user?.role !== role)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}
