import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react'
import { ChevronDownIcon } from 'lucide-react'
import { options } from '../../ui/table/TableContent'
import { useFilterState } from '@/src/hooks/ui/filter/state/useFilterState'

interface FilterStateProps {
    classNames: string
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
    onGetParam: (key: string) => string | null
}

export default function FilterState({
    classNames,
    onGetParam,
    onAddParam,
    onDeleteParam
}: FilterStateProps) {

    const { getStatusButtonText, resolveLabel } = useFilterState({ onGetParam })

    return (
        <Dropdown portalContainer={document.querySelector("#drawer-filters") ?? undefined} className='w-fit'>
            <DropdownTrigger className={`flex ${classNames}`}>
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                    className="capitalize"
                >
                    {getStatusButtonText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="ESTADOS"
                closeOnSelect={true}
                selectedKeys={resolveLabel("availability")}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    selectedKey === "all" ? onDeleteParam("availability") : onAddParam("availability", String(selectedKey) === "activo" ? "true" : "false");
                }}
            >
                {options.map((status) => (
                    <DropdownItem key={status.key} className="capitalize">
                        {status.value}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
