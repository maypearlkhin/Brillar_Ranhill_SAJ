import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LandingWidgetLoader from "@/components/widget/LandingWidgetLoader";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <LandingWidgetLoader />
    </>
  );
}
