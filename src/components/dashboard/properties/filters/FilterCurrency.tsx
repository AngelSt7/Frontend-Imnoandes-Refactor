import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react'
import { currency, useFilterCurrency } from '@/src/hooks/ui/filter/currency/useFilterCurrency';

interface FilterCurrencyProps {
    onGetParam: (key: string) => string | null
    onAddParam: (key : string, value : string) => void
    onDeleteParam: (key : string) => void
}

export default function FilterCurrency({
    onGetParam,
    onAddParam,
    onDeleteParam
} : FilterCurrencyProps ) {

    const { resolveLabel, getCurrencyButtonText } = useFilterCurrency({onGetParam})

  return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                    className="capitalize"
                >
                    {getCurrencyButtonText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="ESTADOS"
                closeOnSelect={true}
                selectedKeys={resolveLabel("currency")}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    selectedKey === "all" ? onDeleteParam("currency") : onAddParam("currency", String(selectedKey));
                }}
            >
                {currency.map((cu) => (
                    <DropdownItem key={cu.key} className="capitalize">
                        {cu.value}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
  )
}
