import { IOpenModal } from "@/src/myLib/hooks/modal";
import { ChipProps } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";

export type mutateProps = UseMutateFunction<any, any, string, unknown>

export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};

export interface RenderCellsProps<T> {
    onOpenModal?: (meta: IOpenModal) => void
    onMutate?: mutateProps;
    item: T;
    columnKey: React.Key
}
