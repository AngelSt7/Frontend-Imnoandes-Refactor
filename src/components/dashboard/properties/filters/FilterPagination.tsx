import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import { Pagination, useFilterPagination } from '@/src/hooks/ui/filter/limit/useFilterPagination';

interface FilterLimitProps {
    classNames: string
    onGetParam: (key: string) => string | null
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
}

export default function FilterPagination({
    classNames,
    onGetParam,
    onAddParam,
    onDeleteParam
}: FilterLimitProps) {

    const { resolveLabel, getCurrencyButtonText } = useFilterPagination({ onGetParam })

    return (
        <Dropdown portalContainer={document.querySelector("#drawer-filters") ?? undefined} className='w-fit'>
            <DropdownTrigger className={`flex ${classNames}`}>
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
                aria-label="PAGINAR"
                closeOnSelect={true}
                selectedKeys={resolveLabel("limit")}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    onAddParam("limit", String(selectedKey));
                }}
            >
                {Pagination.map((pag) => (
                    <DropdownItem key={pag.key} className="capitalize">
                        {pag.value}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
