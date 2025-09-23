'use client'
import { Option, useParamLabel } from '@/src/myLib/hooks/searchParams/useParamLabel';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';

interface ButtonFilterProps {
    classNames?: string
    keyParam: string
    options: Option[]
    defaultLabel?: string
    text?: string
}

export function ButtonFilter(props: ButtonFilterProps) {
    const { getLabel, getText, handleChange } = useParamLabel(
        props.keyParam,
        props.options,
        props.defaultLabel
    );

    return (
        <>
            {props.text && props.text !== '' && <h3 className="text-lg font-medium text-gray-900">{props.text}</h3>}

            <Dropdown className="w-full">
                <DropdownTrigger className={`flex justify-between ${props.classNames}`}>
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
                    aria-label={props.keyParam}
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
        </>
    )
}
