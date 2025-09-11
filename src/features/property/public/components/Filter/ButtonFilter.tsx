'use client'
import { Option, useParamLabel } from '@/src/hooks/searchParams/useParamLabel';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';

interface ButtonFilterProps {
    keyParam: string
    options: Option[]
    defaultLabel?: string
}

export default function ButtonFilter(props : ButtonFilterProps) {
    const { getLabel, getText, handleChange } = useParamLabel(
        props.keyParam,
        props.options,
        props.defaultLabel
    );

    return (
        <Dropdown className="w-full">
            <DropdownTrigger className={`flex justify-between `}>
                <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                    className="capitalize"
                >
                    {getText}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="ESTADOS"
                closeOnSelect={true}
                selectedKeys={(getLabel())}
                selectionMode="single"
                onSelectionChange={(k) => handleChange(k)}
            >
                {props.options.map((option) => (
                    <DropdownItem key={option.key} className="capitalize">
                        {option.value}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
