"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";

interface UrlTransformerConfig {
  regex: RegExp;
  mode: "single" | "multiple";
  joiner?: string;
}

export function useUrlTransformer({ regex, mode, joiner = "-o-" }: UrlTransformerConfig) {
  const pathname = usePathname();
  const params = useSearchParams();

  // Memoizamos el match de la URL
  const matches = useMemo(() => {
  const cleanPath = pathname.split("?")[0];
  const match = cleanPath.match(regex);
  if (!match) return [];

  const segment = match[2]; // ahora sí, es el grupo correcto
  if (!segment) return [];

  return mode === "multiple" ? segment.split(joiner) : [segment];
}, [pathname, regex, mode, joiner]);


  // Callback memoizado para construir URL
  const buildUrl = useCallback(
    (replacements: string[]) => {
      const cleanPath = pathname.split("?")[0];

      let newPath = cleanPath;

if (mode === "single") {
  const replacement = replacements[0] ?? "";
  newPath = cleanPath.replace(regex, `$1${replacement}`);
} else {
  const joined = replacements.join(joiner);
  newPath = cleanPath.replace(regex, `$1${joined}`);
}


      const query = params.toString();
      return query ? `${newPath}?${query}` : newPath;
    },
    [pathname, regex, mode, joiner, params]
  );

  return { matches, buildUrl };
}
