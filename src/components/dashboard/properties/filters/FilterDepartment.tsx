import { useFilterDepartment } from '@/src/hooks/ui/filter/department/useFilterDepartment';
import { DEPARTMENT_DROPDOWN } from '@/src/utils/resolves/bases/select';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import React, { useMemo } from 'react'

interface FilterStateProps {
    onAddParam: (paramKey: string, paramValue: string) => void;
    onDeleteParam: (paramKey: string) => void;
    onGetParam: (key: string) => string | null
}

export default function FilterDepartment({
    onAddParam,
    onDeleteParam,
    onGetParam
}: FilterStateProps) {

    const { getDepartmentButtonText, resolveLabelDepartment } = useFilterDepartment({onGetParam})

    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                    className="capitalize"
                >
                    {getDepartmentButtonText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Departamentos"
                closeOnSelect={true}
                selectionMode="single"
                selectedKeys={resolveLabelDepartment("departmentId")}
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    if (selectedKey === "all") {
                        onDeleteParam("departmentId");
                    } else {
                        onAddParam("departmentId", String(selectedKey));
                    }
                }}
            >
                {DEPARTMENT_DROPDOWN.map((item) => (
                    <DropdownItem key={item.key} className="capitalize">
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
