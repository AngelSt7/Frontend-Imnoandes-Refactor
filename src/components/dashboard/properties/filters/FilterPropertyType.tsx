import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react'
import { currency, useFilterCurrency } from '@/src/hooks/ui/filter/currency/useFilterCurrency';
import { useFilterPropertyType } from '@/src/hooks/ui/filter/propertyType/usePropertyType';
import { PROPERTY_TYPE_SELECT } from '@/src/utils/resolves/bases/select';

interface FilterPropertyTypeProps {
    classNames: string
    onGetParam: (key: string) => string | null
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
}

export default function FilterPropertyType({
    classNames,
    onGetParam,
    onAddParam,
    onDeleteParam
}: FilterPropertyTypeProps) {

    const { resolveLabel, getButtonText } = useFilterPropertyType({ onGetParam })

    return (
        <Dropdown>
            <DropdownTrigger className={`flex ${classNames}`}>
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                    className="capitalize"
                >
                    {getButtonText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="ESTADOS"
                closeOnSelect={true}
                selectedKeys={resolveLabel("propertyType")}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    onAddParam("propertyType", String(selectedKey));
                }}
            >
                {PROPERTY_TYPE_SELECT.map((pr) => (
                    <DropdownItem key={pr.key} className="capitalize">
                        {pr.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
