'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export const propertyTypes = [
  { key: "APARTMENT", emoji: "🏢", label: "Departamento", slug: "departamentos" },
  { key: "HOUSE", emoji: "🏠", label: "Casa", slug: "casas" },
  { key: "WAREHOUSE", emoji: "🏭", label: "Almacenes", slug: "almacenes" },
  { key: "LAND", emoji: "🌾", label: "Terreno / Lote", slug: "terrenos" },
  { key: "OFFICE", emoji: "🏢", label: "Oficina comercial", slug: "oficinas" },
  { key: "COMMERCIAL", emoji: "🏪", label: "Local comercial", slug: "locales-comerciales" }
];

export type PropertyType = {
  key: string;
  emoji: string;
  label: string;
  slug: string;
};

function getSlugsFromPath(path: string): string[] {
  const cleanPath = path.split("?")[0];
  const match = cleanPath.match(/-de-([^/]+?)(?:-en-|$)/);
  if (!match) return [];
  return match[1].split("-o-"); 
}

export function useMultiSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 🔑 Claves derivadas de la URL
  const selectedKeysFromUrl = React.useMemo(() => {
    const slugs = getSlugsFromPath(pathname);
    return new Set(
      propertyTypes.filter(pt => slugs.includes(pt.slug)).map(pt => pt.key)
    );
  }, [pathname]);

  const [tempKeys, setTempKeys] = React.useState<Set<string>>(selectedKeysFromUrl);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempKeys(selectedKeysFromUrl);
    }
  };

  const buildSearchUrl = (selectedItems: PropertyType[]) => {
    const currentParams = new URLSearchParams(params.toString());
    const currentPath = pathname.split("?")[0];
    let baseUrl = "";
    let locationPart = "";

    const locationMatch = currentPath.match(/-en-([^/]+)/);
    if (locationMatch) {
      locationPart = `-en-${locationMatch[1]}`;
      baseUrl = currentPath.split("-en-")[0];
    } else {
      baseUrl = currentPath;
    }

    const propertyTypesText = selectedItems.map(item => item.slug).join("-o-");
    let url = "";

    if (baseUrl.includes("venta-de-") || baseUrl.includes("alquiler-de-")) {
      const baseMatch = baseUrl.match(/(.*?-de-)/);
      if (baseMatch) {
        url = `${baseMatch[1]}${propertyTypesText}${locationPart}`;
      }
    } else {
      url = `/es/search/venta-de-${propertyTypesText}${locationPart}`;
    }

    if (currentParams.toString()) {
      url += `?${currentParams.toString()}`;
    }
    return url;
  };

  const handleConfirm = () => {
    const selectedItems = propertyTypes.filter(item =>
      Array.from(tempKeys).includes(item.key)
    );
    const newUrl = buildSearchUrl(selectedItems);
    if (newUrl) router.push(newUrl);
  };

  const handleClear = () => {
    setTempKeys(new Set());
  };

  const handleCheckboxChange = (propertyId: string, isSelected: boolean) => {
    const newKeys = new Set(tempKeys);
    if (isSelected) {
      newKeys.add(propertyId);
    } else {
      newKeys.delete(propertyId);
    }
    setTempKeys(newKeys);
  };

  const getTriggerText = () => {
    const selectedItems = propertyTypes.filter(item =>
      Array.from(selectedKeysFromUrl).includes(item.key)
    );
    if (selectedItems.length === 0) {
      return "Tipo de inmueble";
    } else if (selectedItems.length === 1) {
      return selectedItems[0].label;
    } else {
      return `${selectedItems.length} tipos seleccionados`;
    }
  };

  return {
    propertyTypes,
    selectedKeysFromUrl,
    tempKeys,
    setTempKeys,
    handleOpenChange,
    handleConfirm,
    handleClear,
    handleCheckboxChange,
    getTriggerText
  };
}
