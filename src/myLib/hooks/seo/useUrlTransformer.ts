"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";

interface UrlTransformerConfig {
  regex: RegExp;
  mode: "single" | "multiple";
  joiner?: string;
  prefix?: string
}

export function useUrlTransformer({ regex, mode, joiner = "-o-" }: UrlTransformerConfig) {
  const pathname = usePathname();
  const params = useSearchParams();

  const matches = useMemo(() => {
    const cleanPath = pathname.split("?")[0];
    const match = cleanPath.match(regex);
    if (!match) return [];

    const segment = match[2];
    if (!segment) return [];

    return mode === "multiple" ? segment.split(joiner) : [segment];
  }, [pathname, regex, mode, joiner]);


  const buildUrl = useCallback(
    (replacements: string[], prefix: string) => {
      const cleanPath = pathname.split("?")[0];
      const match = cleanPath.match(regex);

      if (!match) return pathname;

      const basePath = match[1];
      const currentSegment = match[2]; 
      const restOfPath = match[3] || "";

      const queryParams = match[4] || "";

      let newPath;
      if (mode === "single") {
        const replacement = replacements[0] || currentSegment;
        newPath = `${basePath}${replacement}${restOfPath}`;
      } else {
        const joined = replacements.length > 0 ? `${prefix}${replacements.join(joiner)}` : "";
        const restWithoutCategory = match[3] || "";
        newPath = `${match[1]}${joined}${restWithoutCategory}`;
      }

      const query = params.toString();
      return query ? `${newPath}?${query}` : newPath;
    },
    [pathname, regex, mode, joiner, params]
  );

  return { matches, buildUrl };
}
