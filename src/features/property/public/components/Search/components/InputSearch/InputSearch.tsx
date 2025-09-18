import { LocationSearch } from "@/src/features/property/public/schemas";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useInputSearch } from "./useInputSearch";
import { PopoverSearch } from "../PopoverSearch/PopoverSearch";

export function InputSearch({ locales }: { locales: LocationSearch[] }) {
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
    <div className="w-full">
      <Input
        isClearable
        className="w-full md:w-[300px] border border-zinc-400 rounded-xl"
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
