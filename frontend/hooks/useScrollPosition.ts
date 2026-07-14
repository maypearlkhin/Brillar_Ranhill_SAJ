"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has been scrolled past `threshold` pixels.
 * Used to switch the header between a transparent/tall state and a
 * condensed, elevated state, similar to the reference site's navbar.
 */
export function useScrollPosition(threshold = 24): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
