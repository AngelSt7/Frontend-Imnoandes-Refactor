'use client'
import { useSearch } from "@/src/hooks/search/useSearch";
import { Meta } from "@/src/schema/shared";
import Pagination from "../../show/Pagination";
import { Spinner, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table } from "@heroui/react";
import { ColumnsType } from "../../properties/columns/columns";
import { TopContent } from "./TopContent";
import { useLogicTable } from "./hooks/useLogicTable";
import React from "react";
import { FiltersProps } from "../../properties/content/Filters";
import { UseMutateFunction } from "@tanstack/react-query";
import { IOpenModal } from "@/src/hooks/modal/useModalUtils";

interface RenderCellProps {
    onOpenModal?: (meta: IOpenModal) => void
    onMutate?: UseMutateFunction<any, any, string, unknown>;
};

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

interface TableContentProps<T> {
    baseKey: String[];
    columns: ColumnsType;
    defaultVisibleColumns: (keyof T | string)[]
    renderCells: React.ComponentType<{ item: T; columnKey: React.Key } & RenderCellProps>;
    renderFilters: React.ComponentType<FiltersProps>
    renderCellsProps?: RenderCellProps
    onList: (filters: any) => Promise<ApiResponse<T> | undefined>;
    onAddParam: (key: string, value: string) => void;
    onDeleteParam: (key: string) => void
    onGetParam: (key: string) => string | null
    getRowId: (item: T) => string | number
}

export const options = [
    { value: "Todas", key: "all" },
    { value: "Disponible", key: "activo" },
    { value: "No Disponible", key: "inactivo" },
]

export default function TableContent<T>({
    baseKey,
    renderCells,
    columns,
    defaultVisibleColumns,
    renderFilters,
    renderCellsProps,
    getRowId,
    onList,
    onAddParam,
    onDeleteParam,
    onGetParam
}: TableContentProps<T>) {

    const { data, meta, isLoading, search, setSearch } = useSearch<T>({
        baseKey: baseKey,
        functionService: (filters) => onList(filters),
    });

    const { selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, setStatusFilter, headerColumns } = useLogicTable({ defaultVisibleColumns, columns });

    const CellRenderer = renderCells;
    const Filters = renderFilters
    return (
        <Table
            isCompact
            aria-label={`${baseKey} table`}
            bottomContent={<Pagination meta={meta} />}
            bottomContentPlacement="outside"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => {
                const newKeys =
                    typeof keys === "string"
                        ? new Set([keys])
                        : new Set([...keys].map(String));
                setSelectedKeys(newKeys);
            }}
            topContent={
                <TopContent
                    filterValue={search}
                    onSearchChange={(value) => setSearch(value)}
                    onClear={() => {
                        setSearch("");
                        setStatusFilter("all");
                    }}
                    total={meta?.totalItems || 1}
                    renderFilters={(show) => (
                        <Filters
                            show={show}
                            visibleColumns={visibleColumns}
                            setVisibleColumns={setVisibleColumns}
                            columns={columns}
                            onAddParam={onAddParam}
                            onDeleteParam={onDeleteParam}
                            onGetParam={onGetParam}
                        />
                    )}
                />
            }
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid.toString()}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent="No se encontraron registros"
                items={data}
                isLoading={isLoading}
                loadingContent={<Spinner color="success" />}
            >
                {(item) => (
                    <TableRow className="hover:bg-[#f3f4f6] dark:hover:bg-[#222225] dark:text-[#c9cacb]" key={getRowId(item)}>
                        {(columnKey) => (
                            <TableCell>
                                <CellRenderer
                                    item={item}
                                    columnKey={columnKey}
                                    {...renderCellsProps}
                                />
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}