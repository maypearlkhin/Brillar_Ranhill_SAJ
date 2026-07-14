"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: boolean;
  decimals?: number;
}

/**
 * Animates a numeric value from 0 to `end` using requestAnimationFrame,
 * starting only once `start` becomes true (driven by useInView).
 */
export function useCountUp({ end, duration = 1600, start = false, decimals = 0 }: UseCountUpOptions): string {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!start || hasAnimatedRef.current) {
      return;
    }
    hasAnimatedRef.current = true;

    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(end * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, duration]);

  return value.toFixed(decimals);
}
