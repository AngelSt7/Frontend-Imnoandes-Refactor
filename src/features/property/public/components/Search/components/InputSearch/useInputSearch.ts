import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationService } from "@/src/features/property/public/services";
import { useUrlTransformer } from "@/src/myLib";
import { LocationSearch } from "@/src/features/property/public/schemas";
import { useSearchLocation } from "../../../Location/hooks/useSearchLocation";

interface UseInputSearchProps {
  initialLocales?: LocationSearch[];
}

export function useInputSearch({ initialLocales = [] }: UseInputSearchProps) {
  const router = useRouter();

  const { search, setSearch, data, showNoResults } = useSearchLocation<LocationSearch>({
    baseKey: ["location"],
    functionService: LocationService.search,
  });

  const regex = /^(.*\/search\/[^?]+?)(-en-[^?]*)?(\?.*)?$/;
  const { buildUrl } = useUrlTransformer({
    regex,
    mode: "multiple",
    joiner: "-o-",
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [slugs, setSlugs] = useState<LocationSearch[]>(initialLocales);

  const handleValueChange = (value: string) => {
    setSearch(value);
    setIsPopoverOpen(value.length > 0);
  };

  const handleSelectLocation = (location: LocationSearch) => {
    setSearch("");
    const newSlugs = [...slugs, location];
    setSlugs(newSlugs);
    setIsPopoverOpen(false);

    const slugsArray = newSlugs.map(s => s.slug);
    const newUrl = buildUrl(slugsArray, "-en-");
    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl);
    }
  };

  const handleInputFocus = () => {
    if (search.length > 0 && data.length > 0) setIsPopoverOpen(true);
  };

  return {
    search,
    setSearch,
    data,
    showNoResults,
    isPopoverOpen,
    slugs,
    setSlugs,
    handleValueChange,
    handleSelectLocation,
    handleInputFocus,
    setIsPopoverOpen
    
  };
}
