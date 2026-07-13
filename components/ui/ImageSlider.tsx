"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, type SxProps, type Theme } from "@mui/material";

export interface SliderImage {
  id: string;
  src: string;
  alt: string;
  href?: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  autoplay?: boolean;
  interval?: number;
  transitionDuration?: number;
  loop?: boolean;
  showDots?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Reusable, dependency-free image carousel. Mirrors the reference site's
 * own banner slider: crossfade transition, autoplay, dot navigation only
 * (no prev/next arrows), and no text overlay — callers only need to pass
 * a list of images.
 */
export default function ImageSlider({
  images,
  autoplay = true,
  interval = 5000,
  transitionDuration = 800,
  loop = true,
  showDots = true,
  sx,
}: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoplay || images.length <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((current) => {
        const next = current + 1;
        if (next >= images.length) {
          return loop ? 0 : current;
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, interval, loop, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...sx }}>
      {images.map((image, index) => {
        const slide = (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        );

        return (
          <Box
            key={image.id}
            aria-hidden={index !== activeIndex}
            sx={{
              position: "absolute",
              inset: 0,
              opacity: index === activeIndex ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
            }}
          >
            {image.href ? (
              <Link href={image.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>
                {slide}
              </Link>
            ) : (
              slide
            )}
          </Box>
        );
      })}

      {showDots && images.length > 1 ? (
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 16, lg: 28 },
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {images.map((image, index) => (
            <Box
              key={image.id}
              component="button"
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: index === activeIndex ? 26 : 9,
                height: 9,
                borderRadius: 9,
                border: "none",
                padding: 0,
                cursor: "pointer",
                backgroundColor: index === activeIndex ? "secondary.main" : "rgba(255,255,255,0.6)",
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
