import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@heroui/react'
import { ChevronDownIcon } from 'lucide-react'
import { useFilterState } from './hooks'
import { STATE } from '../constants'

interface FilterStateProps {
    classNames: string
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string[]) => void
    onGetParam: (key: string) => string | undefined
}

export function FilterState({
    classNames,
    onGetParam,
    onAddParam,
    onDeleteParam
}: FilterStateProps) {

    const { getStatusButtonText, resolveLabel } = useFilterState({ onGetParam })

    return (
         <Dropdown className="w-full">
                <DropdownTrigger className={`flex justify-between ${classNames}`}>
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
                    selectedKey === "all" ? onDeleteParam(["availability"]) : onAddParam("availability", String(selectedKey) === "activo" ? "true" : "false");
                }}
            >
                {STATE.map((status) => (
                    <DropdownItem key={status.value} className="capitalize">
                        {status.value}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
