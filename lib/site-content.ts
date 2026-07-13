import type { NavItem, QuickAccessItem, SocialLinkItem } from "@/types/navigation";
import type { CompanyHighlight, HeroSlide, NewsItem, StatItem } from "@/types/content";

export const primaryNavItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Corporate Profile", href: "/about-us/corporate-profile" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Board of Directors", href: "/about-us/board-of-directors" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "News & Events", href: "/media/news-events" },
      { label: "Announcements", href: "/media/announcements" },
    ],
  },
  { label: "Customer Service", href: "/customer-service" },
  { label: "Tender", href: "/tender" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
];

/**
 * Real top-level navigation, matching the reference site's rendered markup
 * (exact labels, order and dropdown contents). "Services" uses the
 * full-width icon mega menu layout; the rest use the simple vertical list.
 */
export const headerNavItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us",
    hasDropdown: true,
    children: [
      { label: "Company Profile", href: "/company-profile" },
      { label: "Board of Directors", href: "/board-of-directors" },
      { label: "Organization Structure", href: "/organization-structure" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Achievements & Awards", href: "/achievements-awards" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    layout: "mega",
    children: [
      { label: "Application For Water Supply", href: "/services-application", icon: "waterDrop" },
      { label: "Termination Of Water Supply", href: "/services-termination-of-water-supply", icon: "waterDropSlash" },
      { label: "Reconnection Of Water Supply", href: "/services-reconnection-of-water-supply", icon: "waterDropDot" },
      { label: "Request Water Meter Testing", href: "/services-request-water-meter-testing", icon: "waterMeter" },
      { label: "Change Of Account Name", href: "/services-change-of-account-name", icon: "twoPeople" },
      { label: "Change Tariff", href: "/change-tariff", icon: "waterDropPercent" },
      { label: "Installment", href: "/installment", icon: "waterDropWaves" },
    ],
  },
  {
    label: "Help Center",
    href: "/help-center",
    hasDropdown: true,
    children: [
      { label: "SAJ Info Centre (SAJIC)", href: "/saj-info-centre-sajic" },
      { label: "Registered Plumbers", href: "/registeredplumber" },
      { label: "E-Aduan", href: "/report-a-problem" },
      { label: "FAQ", href: "/frequently-asked-questions" },
    ],
  },
  {
    label: "Information",
    href: "/information",
    hasDropdown: true,
    children: [
      { label: "Water Tariff", href: "/water-tariff" },
      { label: "Water Saving tips", href: "/water-saving-tips" },
      { label: "Customer Charter", href: "/customer-charter" },
      { label: "Development Plan Submission Guidelines", href: "/development-plan-submission-guidelines" },
      { label: "Privacy Notice", href: "/privacy-notice" },
      { label: "Tender", href: "/tender" },
      { label: "Policy Statement", href: "/policy-statement" },
    ],
  },
  {
    label: "Media Rooms",
    href: "/media-rooms",
    hasDropdown: true,
    children: [
      { label: "News", href: "/blog/news" },
      { label: "Events", href: "/blog/events" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

export const quickAccessItems: QuickAccessItem[] = [
  { label: "Notice Of Disruption", href: "/notice-of-disruption", icon: "disruption" },
  { label: "E-Aduan", href: "/e-aduan", icon: "complaint" },
  { label: "Tender", href: "/tender", icon: "tender" },
  { label: "Our Locations", href: "/our-locations", icon: "location" },
  { label: "Miscellaneous Bill", href: "/miscellaneous-bill", icon: "bill" },
  { label: "Whistleblowing", href: "/whistleblowing", icon: "whistle" },
];

export const socialLinks: SocialLinkItem[] = [
  { label: "Facebook", href: "https://www.facebook.com/ranhillsaj", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/ranhillsaj", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/ranhillsaj", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ranhill-saj", icon: "linkedin" },
];

/**
 * Hero banner slides, matching the reference site's own OwlCarousel banner
 * (pure images, no text overlay, fade transition, ~5s autoplay, no
 * prev/next arrows — only dots). Order mirrors the live carousel.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "slide-home-d-01",
    imageSrc: "/images/hero-hands-water.png",
    imageAlt: "Cupped hands holding clean water",
  },
  {
    id: "slide-yes-broadband",
    imageSrc: "/images/hero-yes-broadband.jpg",
    imageAlt: "Yes 5G Advanced Broadband free water bill promotion",
    href: "https://www.yes.my/ranhillsaj/",
  },
  {
    id: "slide-rytbank",
    imageSrc: "/images/hero-rytbank.jpg",
    imageAlt: "Ryt Bank cash rebate for water bill payment promotion",
    href: "https://www.rytbank.my/partner-perks/ranhill",
  },
  {
    id: "slide-mysaj-3",
    imageSrc: "/images/hero-dam.png",
    imageAlt: "Ranhill SAJ dam and raw water intake facility",
  },
  {
    id: "slide-mysaj-2",
    imageSrc: "/images/hero-treatment-plant.png",
    imageAlt: "Ranhill SAJ water treatment plant cascading clean water",
  },
];

export const companyHighlights: CompanyHighlight[] = [
  {
    id: "operations",
    title: "Integrated Operations",
    description:
      "From raw water abstraction to treatment, distribution and billing, we manage the complete water supply cycle for the state of Johor.",
  },
  {
    id: "infrastructure",
    title: "Extensive Infrastructure",
    description:
      "An extensive network of reservoirs and pipelines keeps treated water flowing reliably to homes, businesses and institutions.",
  },
  {
    id: "sustainability",
    title: "Sustainable Future",
    description:
      "We continuously invest in modern treatment technology and catchment protection to secure water resources for generations to come.",
  },
];

export const statsItems: StatItem[] = [
  { id: "wtps", value: 47, label: "Water Treatment Plants" },
  { id: "capacity", value: 2351, label: "Million Litres Treated Daily (MLD)" },
  { id: "reservoirs", value: 724, label: "Reservoirs" },
  { id: "pipelines", value: 24300, label: "Kilometres of Pipelines" },
];

export const newsItems: NewsItem[] = [
  {
    id: "news-water-tank",
    imageSrc: "/images/hero-dam.png",
    imageAlt: "Water tank construction site in Bukit Naning, Bakri",
    category: "Events",
    date: "Jul 2024",
    title: "Enhancing Water Accessibility: Water Tank Construction in Bukit Naning, Bakri",
    href: "/blog/projek-pembinaan-tangki-air-kawasan-dun-bukit-naning-parlimen-bakri-johor",
  },
  {
    id: "news-mysaj",
    imageSrc: "/images/hero-hands-water.png",
    imageAlt: "MySAJ 2.0 mobile application",
    category: "Announcements",
    date: "Jun 2026",
    title: "Go Digital with MySAJ 2.0!",
    href: "/blog/go-digital-with-mysaj-2-0",
  },
  {
    id: "news-rebate",
    imageSrc: "/images/hero-treatment-plant.png",
    imageAlt: "Free water rebate program",
    category: "Announcements",
    date: "Jan 2024",
    title: "Program Pemberian Rebat Air Percuma",
    href: "/blog/program-pemberian-rebat-air-percuma",
  },
];

export const ctaSection = {
  imageSrc: "/images/hero-hands-water.png",
  imageAlt: "Hands cupping clean water",
  title: "Clean Water, Clean World: Making a Difference.",
  description: "Join us in protecting the environment and promoting sustainability.",
  ctaLabel: "Explore More",
  ctaHref: "/about-us",
};
