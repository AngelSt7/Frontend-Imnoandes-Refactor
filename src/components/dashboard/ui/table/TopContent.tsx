import React from "react";
import { Button, Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { Meta } from "@/src/schema/shared";

interface TopContentProps {
  messageButton: string;
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  total: Meta['totalItems'] | undefined;
  renderFilters: React.JSX.Element;
}

export const TopContent = ({
  messageButton,
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


        {renderFilters}
      </div>

        <span className="text-default-400 text-small">Total {total}</span>
      {/* <div className="flex justify-between items-center">
        <Button type='submit' radius='full' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-fit'>
          {messageButton}
        </Button>
      </div> */}

    </div>
  );
};
