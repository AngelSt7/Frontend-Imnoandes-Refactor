import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react'
import { ColumnsType } from '../columns/columns';

interface FilterColumnsProps {
    classNames?: string
    visibleColumns: "all" | Set<string>;
    setVisibleColumns: React.Dispatch<React.SetStateAction<"all" | Set<string>>>;
    columns: ColumnsType
}

export default function FilterColumns({
    classNames,
    visibleColumns,
    setVisibleColumns,
    columns
} : FilterColumnsProps) {
    return (
         <Dropdown className="w-full">
                <DropdownTrigger className={`flex justify-between ${classNames}`}>
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Columnas
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
    )
}
