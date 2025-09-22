import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import DrawerHero from "@/app/success/DrawerHero";
import { TOP_CONTENT_SHOW } from "@/src/features/property/admin/interfaces";
import { TopContentProps } from "@/src/myLib";


export const TopContent = ({
  filterValue,
  onSearchChange,
  onClear,
  total,
  renderFilters
}: TopContentProps<TOP_CONTENT_SHOW>) => {
  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full md:max-w-[44%]"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <div className="hidden md:flex items-center gap-3">{renderFilters(["filters", "pagination", "state"])}</div>

      </div>

      <div className=" flex justify-between items-center">
        <span className="text-default-400 text-small">Total {total}</span>
        <div className="md:hidden">{renderFilters(["filters"])}</div>
      </div>

        <DrawerHero
          renderFilters={renderFilters(["columns", "categories", "types", "departmentId", "propertyType", "propertyCategory", "clear", "pagination", "state"])}
        />
    </div>
  );
};
