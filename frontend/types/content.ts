/**
 * A single hero banner slide. The reference site's banner slider is a pure
 * image carousel (no overlaid heading/CTA), so only the image and an
 * optional destination link are modeled here.
 */
export interface HeroSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export interface NewsItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  title: string;
  href: string;
}

export interface CompanyHighlight {
  id: string;
  title: string;
  description: string;
}
