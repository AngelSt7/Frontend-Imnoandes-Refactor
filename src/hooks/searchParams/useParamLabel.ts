import { useMemo } from "react";
import { useQueryParam } from "@/src/hooks/searchParams/useQueryParam";
import { SharedSelection } from "@heroui/react";

export interface Option {
  key: string;
  value: string;
}

export function useParamLabel(
  key: string,
  options: Option[],
  defaultLabel: string = "Cualquier opción"
) {
  const { getParam, setParam, deleteParam } = useQueryParam();

  const getLabel = () => {
    const value = getParam(key);
    if (!value) return new Set(["all"]);
    const match = options.find(opt => opt.key === value);
    return new Set([match?.key || "all"]);
  };

  const getText = useMemo(() => {
    const value = getParam(key);
    const selectedOption = options.find(opt => opt.key === value);
    return selectedOption?.value || defaultLabel;
  }, [getParam, key, options, defaultLabel]);

  const handleChange = (keys: SharedSelection) => {
    const selectedKey = Array.from(keys)[0];
    if (selectedKey === "ALL") {
      deleteParam(key);
    } else {
      setParam(key, selectedKey.toString());
    }
  };

  return { getLabel, getText, handleChange };
}
