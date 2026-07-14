import type { ReactNode } from "react";
import { CustomerLayout } from "@/components/layouts/RoleLayouts";
import IntegrationWidget from "@/components/widget/IntegrationWidget";

export default function CustomerRootLayout({ children }: { children: ReactNode }) {
  return <CustomerLayout widget={<IntegrationWidget />}>{children}</CustomerLayout>;
}
