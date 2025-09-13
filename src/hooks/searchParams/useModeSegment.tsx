'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export interface ModeOption {
  key: string; 
  value: string;
}

export function useModeSegment(options: ModeOption[], defaultLabel = "Seleccionar") {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentMode = useMemo(() => {
    const cleanPath = pathname.split('?')[0];
    const match = cleanPath.match(/\/([^/]+?)-de-/);
    return match ? match[1] : null;
  }, [pathname]);

  const getText = useMemo(() => {
    const selected = options.find(opt => opt.key === currentMode);
    return selected?.value || defaultLabel;
  }, [currentMode, options, defaultLabel]);

  const getLabel = () => {
    return new Set([currentMode || 'ALL']);
  };

  const handleChange = (keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    if (!selectedKey || selectedKey === 'ALL') return;

    const cleanPath = pathname.split('?')[0];
    const queryString = params.toString() ? `?${params.toString()}` : '';

    const newPath = cleanPath.replace(/\/(venta|alquiler)-de-/, `/${selectedKey}-de-`);

    router.push(`${newPath}${queryString}`);
  };

  return { currentMode, getText, getLabel, handleChange };
}
