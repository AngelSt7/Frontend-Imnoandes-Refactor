import { LocationSearch } from "@/src/features/property/public/schemas";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useInputSearch } from "./useInputSearch";
import { PopoverSearch } from "../PopoverSearch/PopoverSearch";

export default function InputSearch({ locales }: { locales: LocationSearch[] }) {
  const {
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
  } = useInputSearch({ initialLocales: locales });

  return (
    <div className="relative w-full">
      <Input
        isClearable
        className="w-full min-h-24"
        placeholder="Buscar..."
        startContent={<SearchIcon />}
        value={search}
        onClear={() => {
          setSearch('');
          setIsPopoverOpen(false);
        }}
        onValueChange={handleValueChange}
        onFocus={handleInputFocus}
      />

      <PopoverSearch
        isOpen={isPopoverOpen && search.length > 0}
        data={data}
        setIsOpen={setIsPopoverOpen}
        selects={slugs}
        setSlugs={setSlugs}
        onSelect={handleSelectLocation}
        showNoResults={showNoResults}
      />
    </div>
  );
}
