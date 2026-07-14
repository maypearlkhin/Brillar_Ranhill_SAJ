import type { ReactNode } from "react";
import { AdminLayout } from "@/components/layouts/RoleLayouts";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
