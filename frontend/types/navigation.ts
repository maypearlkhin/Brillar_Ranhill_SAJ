import type { ServiceIconName } from "@/components/ui/icons/ServiceIcons";

export interface NavLinkItem {
  label: string;
  href: string;
}

/** A dropdown entry. `icon` is only used by the "mega" layout. */
export interface NavChildItem extends NavLinkItem {
  icon?: ServiceIconName;
}

/**
 * A single navbar entry. `hasDropdown` reflects whether the original site
 * shows a caret/dropdown affordance for this item. `layout` selects which
 * dropdown presentation to render: a simple vertical list ("list", the
 * default) or the full-width icon grid used by "Services" ("mega").
 */
export interface NavItem extends NavLinkItem {
  hasDropdown?: boolean;
  layout?: "list" | "mega";
  children?: NavChildItem[];
}

export interface QuickAccessItem {
  label: string;
  href: string;
  icon: "disruption" | "complaint" | "tender" | "location" | "bill" | "whistle";
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "youtube" | "linkedin";
}
