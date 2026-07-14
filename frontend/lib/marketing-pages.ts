export interface MarketingSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface MarketingPageData {
  title: string;
  subtitle: string;
  bannerImage: string;
  breadcrumb?: string;
  sections: MarketingSection[];
  highlights?: { label: string; value: string }[];
}

const BANNERS = {
  water: "/images/hero-hands-water.png",
  plant: "/images/hero-treatment-plant.png",
  dam: "/images/hero-dam.png",
  forest: "/images/about-forest-lake.png",
};

function titleFromSlug(slug: string): string {
  const last = slug.split("/").pop() ?? slug;
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function defaultSections(title: string): MarketingSection[] {
  return [
    {
      heading: "Overview",
      body: [
        `Ranhill SAJ is committed to delivering reliable, safe and sustainable water supply services across Johor. This page provides information about ${title.toLowerCase()} as part of our corporate and customer service portal.`,
        "Our teams work continuously to maintain treatment plants, distribution networks and customer support channels so that every household and business receives uninterrupted access to clean water.",
      ],
    },
    {
      heading: "Our commitment",
      body: [
        "We operate with transparency, regulatory compliance and environmental stewardship. Customer feedback and service quality metrics guide our improvement programmes year on year.",
      ],
      bullets: [
        "24/7 emergency response for supply disruptions",
        "Digital billing and online account management",
        "Investments in treatment technology and pipeline integrity",
        "Community outreach on water conservation",
      ],
    },
    {
      heading: "Need assistance?",
      body: [
        "Contact our customer service hotline at 1800 88 7474 or visit any Ranhill SAJ branch. For online account access, sign in to the customer portal.",
      ],
    },
  ];
}

const PAGE_OVERRIDES: Record<string, Partial<MarketingPageData> & { title: string }> = {
  "about-us": {
    title: "About Us",
    subtitle: "Leading water utility operator for the state of Johor, Malaysia.",
    bannerImage: BANNERS.water,
    highlights: [
      { label: "Founded", value: "1966" },
      { label: "Population served", value: "4M+" },
      { label: "Treatment plants", value: "47" },
    ],
    sections: [
      {
        heading: "Who we are",
        body: [
          "Ranhill SAJ Sdn Bhd manages and operates the water treatment, distribution and billing network across Johor under a concession with the State Government.",
          "From raw water abstraction through treatment, storage and pipeline distribution, we ensure safe potable water reaches homes, industries and public institutions.",
        ],
      },
      {
        heading: "What we do",
        body: ["Our integrated operations cover the full water supply value chain:"],
        bullets: [
          "Raw water intake and reservoir management",
          "Water treatment and quality monitoring",
          "Distribution network maintenance",
          "Customer billing and digital services (MySAJ)",
        ],
      },
    ],
  },
  "company-profile": {
    title: "Company Profile",
    subtitle: "Corporate identity, mandate and operational scope of Ranhill SAJ.",
    bannerImage: BANNERS.plant,
    sections: [
      {
        heading: "Corporate profile",
        body: [
          "Ranhill SAJ is the largest water operator in Johor, responsible for treating and distributing water to urban and rural communities throughout the state.",
          "We employ skilled engineers, operators and customer service professionals dedicated to service excellence and sustainable resource management.",
        ],
      },
      {
        heading: "Regulatory framework",
        body: [
          "Operations are governed by the National Water Services Commission (SPAN) and state water regulatory requirements. We publish performance data and comply with national drinking water quality standards.",
        ],
      },
    ],
  },
  "mission-vision": {
    title: "Mission & Vision",
    subtitle: "Our purpose and long-term aspirations for Johor's water future.",
    bannerImage: BANNERS.forest,
    highlights: [
      { label: "Vision", value: "Sustainable water for all" },
      { label: "Mission", value: "Safe, reliable supply" },
    ],
    sections: [
      {
        heading: "Vision",
        body: ["To be the leading sustainable water services provider, ensuring every community in Johor has access to safe and affordable water now and for future generations."],
      },
      {
        heading: "Mission",
        body: ["To deliver reliable potable water through efficient operations, innovation and responsible stewardship of water resources."],
        bullets: ["Customer-centric service", "Operational excellence", "Environmental protection", "Community partnership"],
      },
    ],
  },
  "board-of-directors": {
    title: "Board of Directors",
    subtitle: "Governance and leadership overseeing Ranhill SAJ operations.",
    bannerImage: BANNERS.dam,
    sections: [
      {
        heading: "Board governance",
        body: [
          "The Board of Directors provides strategic direction and oversight for Ranhill SAJ, ensuring accountability to stakeholders, regulators and the communities we serve.",
          "Board members bring expertise in utilities, finance, engineering and public policy to guide long-term infrastructure investment and service quality.",
        ],
      },
    ],
  },
  "contact-us": {
    title: "Contact Us",
    subtitle: "Reach Ranhill SAJ customer service, branches and emergency hotlines.",
    bannerImage: BANNERS.water,
    highlights: [
      { label: "Hotline", value: "1800 88 7474" },
      { label: "Email", value: "customercare@ranhill.com" },
      { label: "Hours", value: "Mon–Fri 8am–5pm" },
    ],
    sections: [
      {
        heading: "Customer service",
        body: ["For billing enquiries, supply issues and general support, contact our 24-hour hotline or visit a branch office."],
        bullets: ["Head Office: Johor Bahru", "SAJ Info Centres statewide", "Online: MySAJ customer portal"],
      },
    ],
  },
  "water-tariff": {
    title: "Water Tariff",
    subtitle: "Understanding domestic and commercial water rates in Johor.",
    bannerImage: BANNERS.plant,
    sections: [
      {
        heading: "Tariff structure",
        body: [
          "Water tariffs comprise a monthly service fee plus usage charges based on meter readings. Rates differ for domestic, commercial and industrial categories.",
          "Registered customers can view their plan and billing breakdown in the online customer portal.",
        ],
      },
    ],
  },
  "frequently-asked-questions": {
    title: "FAQ",
    subtitle: "Common questions about billing, supply and online services.",
    bannerImage: BANNERS.water,
    sections: [
      {
        heading: "Billing & payments",
        body: ["How do I pay my bill?", "You can pay online through the customer portal, at authorised payment channels or via Quick Payment on our website."],
        bullets: ["View usage history in Billing & Usage", "Download statements as PDF", "Payment confirmation within 1–2 business days"],
      },
      {
        heading: "Supply issues",
        body: ["Report leaks or low pressure through E-Aduan or call 1800 88 7474 for emergencies."],
      },
    ],
  },
};

export const ALL_MARKETING_SLUGS = [
  "about-us",
  "company-profile",
  "board-of-directors",
  "organization-structure",
  "mission-vision",
  "achievements-awards",
  "services",
  "services-application",
  "services-termination-of-water-supply",
  "services-reconnection-of-water-supply",
  "services-request-water-meter-testing",
  "services-change-of-account-name",
  "change-tariff",
  "installment",
  "help-center",
  "saj-info-centre-sajic",
  "registeredplumber",
  "report-a-problem",
  "frequently-asked-questions",
  "information",
  "water-tariff",
  "water-saving-tips",
  "customer-charter",
  "development-plan-submission-guidelines",
  "privacy-notice",
  "tender",
  "policy-statement",
  "media-rooms",
  "blog/news",
  "blog/events",
  "contact-us",
  "notice-of-disruption",
  "e-aduan",
  "our-locations",
  "miscellaneous-bill",
  "whistleblowing",
  "about-us/corporate-profile",
  "about-us/board-of-directors",
  "media/news-events",
  "media/announcements",
  "customer-service",
  "career",
  "blog/projek-pembinaan-tangki-air-kawasan-dun-bukit-naning-parlimen-bakri-johor",
  "blog/go-digital-with-mysaj-2-0",
  "blog/program-pemberian-rebat-air-percuma",
];

const BANNER_CYCLE = [BANNERS.water, BANNERS.plant, BANNERS.dam, BANNERS.forest];

export function getMarketingPage(slug: string): MarketingPageData {
  const override = PAGE_OVERRIDES[slug];
  const title = override?.title ?? titleFromSlug(slug);
  const bannerIndex = slug.length % BANNER_CYCLE.length;

  return {
    title,
    subtitle: override?.subtitle ?? `Information about ${title.toLowerCase()} at Ranhill SAJ.`,
    bannerImage: override?.bannerImage ?? BANNER_CYCLE[bannerIndex] ?? BANNERS.water,
    breadcrumb: slug.includes("/") ? slug.split("/").map(titleFromSlug).join(" › ") : undefined,
    highlights: override?.highlights,
    sections: override?.sections ?? defaultSections(title),
  };
}
