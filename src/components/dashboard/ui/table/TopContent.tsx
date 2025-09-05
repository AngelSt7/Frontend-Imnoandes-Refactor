import React from "react";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { Meta } from "@/src/schema/shared";
import GenericDrawer from "@/app/success/GenericDrawer";

export type TopContentShow =
  | "currency"
  | "state"
  | "columns"
  | "departmentId"
  | "categories"
  | "types"
  | "pagination"
  | "propertyType"
  | "propertyCategory"
  | "clear"
  | "more-filters"

interface TopContentProps {
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  total: Meta['totalItems'] | undefined;
  renderFilters: (show: TopContentShow[]) => React.ReactNode;
}

export const TopContent = ({
  filterValue,
  onSearchChange,
  onClear,
  total,
  renderFilters
}: TopContentProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <div className="hidden lg:flex items-center gap-3">{renderFilters(["more-filters", "departmentId", "clear", "pagination", "state"])}</div>

        <GenericDrawer
          renderFilters={renderFilters(["columns", "categories", "types", "departmentId", "propertyType", "propertyCategory", "clear", "pagination", "state"])}
        />

      </div>

      <span className="text-default-400 text-small">Total {total}</span>

    </div>
  );
};
