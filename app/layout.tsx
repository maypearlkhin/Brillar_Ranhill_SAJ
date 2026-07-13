import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WidgetLoader from "@/components/widget/WidgetLoader";
import { bodyFont, headingFont } from "@/theme/fonts";

import { PublicEnvScript } from 'next-runtime-env';

export const metadata: Metadata = {
  title: {
    default: "Ranhill SAJ | Water Supply for Johor",
    template: "%s | Ranhill SAJ",
  },
  description:
    "Ranhill SAJ manages and operates the water treatment, distribution and billing network across the state of Johor, Malaysia.",
  keywords: ["Ranhill SAJ", "Johor water supply", "water treatment", "MySAJ", "water billing Johor"],
  openGraph: {
    title: "Ranhill SAJ | Water Supply for Johor",
    description:
      "Ranhill SAJ manages and operates the water treatment, distribution and billing network across the state of Johor, Malaysia.",
    type: "website",
    locale: "en_MY",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <ThemeRegistry>
          <Header />
          <WidgetLoader />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
