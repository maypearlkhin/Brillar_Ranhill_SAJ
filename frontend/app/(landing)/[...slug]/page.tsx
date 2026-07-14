import type { Metadata } from "next";
import MarketingPageLayout from "@/components/layout/MarketingPageLayout";
import { ALL_MARKETING_SLUGS, getMarketingPage } from "@/lib/marketing-pages";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return ALL_MARKETING_SLUGS.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const page = getMarketingPage(path);
  return {
    title: page.title,
    description: page.subtitle,
  };
}

export default async function MarketingContentPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = getMarketingPage(path);
  return <MarketingPageLayout {...page} />;
}
