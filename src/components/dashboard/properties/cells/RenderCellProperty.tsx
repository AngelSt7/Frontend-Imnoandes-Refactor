import React from "react";
import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ChipProps } from "@heroui/react";
import { AdminProperty } from "@/src/types";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { UseMutateFunction } from "@tanstack/react-query";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";


export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};
interface RenderCellPropertyProps {
    mutate?: mutateProps;
    item: AdminProperty;
    columnKey: React.Key
    onDetails: (item: AdminProperty['id']) => void | undefined
    openModalEdit?: (id: number) => void
}

export type ChangeStatus = {
    id: string;
    status: boolean;
};

export type mutateProps = UseMutateFunction<any, Error, ChangeStatus, unknown>

export const RenderCellProperty = ({
    mutate,
    item,
    columnKey,
    onDetails,
    openModalEdit
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
                    // onDoubleClick={() => mutate({ id: item.id, status: item.activo })}
                    role="button"
                    tabIndex={0}
                >
                    {statusText}
                </Chip>
            );

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
                            <DropdownItem key="edit" onPress={() => console.log(item.id)
                                // openModalEdit!(item.id)
                            }>
                                Editar
                            </DropdownItem>
                            <DropdownItem key="custom" onPress={() => onDetails(item.id)
                                // openModalEdit!(item.id)
                            }>
                                Personalizar propiedad
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                            // onPress={() => {
                            //     ToastDelete({
                            //         message: `¿Desea eliminar el usuario`,
                            //         name: `${item.nombre} ${item.apellido}`,
                            //         onConfirm: () => mutate({ id: item.id, status: 1 }),
                            //     });
                            // }}
                            >
                                Eliminar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );

        default:
            return cellValue;
    }
};
