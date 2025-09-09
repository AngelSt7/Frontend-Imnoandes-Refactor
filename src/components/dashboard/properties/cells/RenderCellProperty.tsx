import React from "react";
import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ChipProps } from "@heroui/react";
import { AdminProperty } from "@/src/types";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { UseMutateFunction } from "@tanstack/react-query";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import { Actions, IOpenModal } from "@/src/hooks/modal/useModalUtils";
import { formatDate } from '@/src/utils/frontend/format/dateUtils';

export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};
interface RenderCellPropertyProps {
    onOpenModal?: (meta: IOpenModal) => void
    onMutate?: mutateProps;
    item: AdminProperty;
    columnKey: React.Key
}

export type ChangeStatus = {
    id: string;
    status: boolean;
};

export type mutateProps = UseMutateFunction<any, any, string, unknown>

export const RenderCellProperty = ({
    onMutate,
    onOpenModal,
    item,
    columnKey
}: RenderCellPropertyProps) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {

        case "price":
            return formatCurrency(item.price, item.currency);

        case "availability":
            const statusText = item.availability === true ? "activo" : "inactivo";
            return (
                <Chip
                    className="capitalize cursor-pointer select-none"
                    color={statusColorMap[statusText]}
                    size="sm"
                    variant="flat"
                    onDoubleClick={() => onMutate?.(item.id)}
                    role="button"
                    tabIndex={0}
                >
                    {statusText}
                </Chip>
            );
        
        case "createdAt": 
            return formatDate(item.createdAt, "short");
        
        case "updatedAt":
            return formatDate(item.updatedAt, "short");

        case "actions":
            return (
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu disabledKeys={item.availability === false ? ["edit", "delete"] : []}>
                            <DropdownItem key="edit" onPress={() => {
                                onOpenModal?.({action: Actions.edit, id: item.id});
                            }}>
                                Editar
                            </DropdownItem>
                            <DropdownItem key="detail" onPress={() => onOpenModal?.({action: Actions.details, id: item.id})}>
                                Ver detalles
                            </DropdownItem>
                            <DropdownItem key="custom" onPress={() => onOpenModal?.({action: Actions.customImages, id: item.id})}>
                                Personalizar propiedad
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );

        default:
            return cellValue;
    }
};
