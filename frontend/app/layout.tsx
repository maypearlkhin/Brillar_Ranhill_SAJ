import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import AuthProvider from "@/contexts/AuthContext";
import { bodyFont, headingFont } from "@/theme/fonts";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
  title: {
    default: "Ranhill SAJ | Water Supply for Johor",
    template: "%s | Ranhill SAJ",
  },
  description:
    "Ranhill SAJ manages and operates the water treatment, distribution and billing network across the state of Johor, Malaysia.",
  keywords: ["Ranhill SAJ", "Johor water supply", "water treatment", "MySAJ", "water billing Johor"],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
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
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
