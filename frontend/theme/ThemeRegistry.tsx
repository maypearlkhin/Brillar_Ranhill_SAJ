"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { EmotionCache } from "@emotion/cache";
import theme from "./index";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * Wires Emotion's SSR cache into the App Router so MUI styles are
 * generated on the server and flushed into the initial HTML response,
 * avoiding a flash of unstyled content on first paint.
 */
export default function ThemeRegistry({ children }: ThemeRegistryProps): React.JSX.Element {
  const [{ cache, flush }] = React.useState(() => {
    const emotionCache: EmotionCache = createCache({ key: "mui" });
    emotionCache.compat = true;
    const prevInsert = emotionCache.insert;
    let inserted: string[] = [];
    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flushFn = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: emotionCache, flush: flushFn };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
