import { useRouter } from "next/navigation";
import React from "react";
import { useUrlTransformer } from "../../../hooks/seo/useUrlTransformer";
import { UseSEOSelectProps } from "../interfaces/interface";

export function useSEOSelect({ regex, mode, joiner, options }: UseSEOSelectProps) {
  const router = useRouter();
  const { matches, buildUrl } = useUrlTransformer({ regex, mode, joiner });

  const selectedKeysFromUrl = React.useMemo(
    () => new Set(options.filter(opt => matches.includes(opt.slug)).map(opt => opt.key)),
    [matches, options]
  );

  const [tempKeys, setTempKeys] = React.useState<Set<string>>(selectedKeysFromUrl);

  const syncTempSelection = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen) setTempKeys(selectedKeysFromUrl);
    },
    [selectedKeysFromUrl]
  );

  const applySelection = React.useCallback(() => {
    const selectedItems = options.filter(item => tempKeys.has(item.key));
    if (selectedItems.length === 0) return;

    const newUrl = buildUrl(selectedItems.map(opt => opt.slug));
    router.push(newUrl);
  }, [options, tempKeys, buildUrl, router]);

  const clearSelection = React.useCallback(
    () => setTempKeys(new Set()),
    []
  );

const toggleSelection = React.useCallback(
  (id: string, isSelected: boolean) => {
    setTempKeys(prev => {
      if (mode === "single") {
        return isSelected ? new Set([id]) : new Set();
      }
      const next = new Set(prev);
      isSelected ? next.add(id) : next.delete(id);
      return next;
    });
  },
  [mode]
);

  const getButtonLabel = React.useCallback(() => {
    const selectedItems = options.filter(item => selectedKeysFromUrl.has(item.key));
    if (selectedItems.length === 0) return "Tipo de inmueble";
    if (selectedItems.length === 1) return selectedItems[0].label;
    return `${selectedItems.length} tipos seleccionados`;
  }, [options, selectedKeysFromUrl]);

  return {
    options,
    selectedKeysFromUrl,
    tempKeys,
    setTempKeys,
    syncTempSelection,
    applySelection,
    clearSelection,
    toggleSelection,
    getButtonLabel,
  };
}
