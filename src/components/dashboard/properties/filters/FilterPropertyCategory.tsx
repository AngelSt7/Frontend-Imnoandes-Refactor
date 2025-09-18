import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import { useRef } from 'react';
import { PROPERTY_CATEGORY_SELECT } from '@/src/utils/resolves/bases/select';
import { useFilterPropertyCategory } from '@/src/hooks/ui/filter/propertyCategory/usePropertyCategory';

interface FilterPropertyCategoryProps {
    classNames: string
    onGetParam: (key: string) => string | null
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
}

export default function FilterPropertyCategory({
    classNames,
    onGetParam,
    onAddParam,
    onDeleteParam
}: FilterPropertyCategoryProps) {
    
    const { resolveLabel, getButtonText } = useFilterPropertyCategory({ onGetParam })

    return (
        <Dropdown>
            <DropdownTrigger className={`flex justify-between ${classNames}`}>
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
                aria-label="CATEGORIAS"
                closeOnSelect={true}
                selectedKeys={resolveLabel("propertyCategory")}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    onAddParam("propertyCategory", String(selectedKey));
                }}
            >
                {PROPERTY_CATEGORY_SELECT.map((pr) => (
                    <DropdownItem key={pr.key} className="capitalize">
                        {pr.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
