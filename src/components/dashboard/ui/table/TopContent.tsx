import React, { Dispatch, SetStateAction } from "react";
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { ColumnsType } from "../../properties/columns/columns";
import { Meta } from "@/src/schema/shared";

interface TopContentProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
  onSearchChange: (value: string) => void
  onClear: () => void;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  visibleColumns: "all" | Set<string>;
  setVisibleColumns: Dispatch<SetStateAction<"all" | Set<string>>>;
  total: Meta['totalItems'] | undefined;
  statusOptions: { name: string; uid: string; }[];
  columns: ColumnsType;
  messageButton: string;
}

export const TopContent: React.FC<TopContentProps> = ({ 
  filterValue, 
  onSearchChange, 
  onClear, 
  statusFilter, 
  setStatusFilter, 
  visibleColumns, 
  setVisibleColumns, 
  total, 
  statusOptions, 
  columns, 
  messageButton
}) => {
  
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

        <div className="flex gap-3">
          {/* Dropdown de Status */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Status Filter"
              closeOnSelect={true}
              selectedKeys={new Set([statusFilter])}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const key = typeof keys === "string" ? keys : String([...keys][0]);
                setStatusFilter(key);
              }}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
      
          {/* Dropdown de Columnas */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                if (keys === "all") {
                  setVisibleColumns("all");
                } else {
                  const stringKeys = new Set([...keys].map(String));
                  setVisibleColumns(stringKeys);
                }
              }}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {total}</span>
      </div>
    </div>
  );
};