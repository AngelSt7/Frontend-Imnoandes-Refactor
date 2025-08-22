'use client'
import { useSearch } from "@/src/hooks/search/useSearch";
import { Meta } from "@/src/schema/shared";
import { servicesMap } from "@/src/services/mapping/mapping";
import Pagination from "../../show/Pagination";
import { Spinner, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table } from "@heroui/react";
import { ColumnsType } from "../../properties/columns/columns";
import { TopContent } from "./TopContent";
import { useLogicTable } from "./hooks/useLogicTable";
import React from "react";
import { FiltersProps } from "../../properties/content/Filters";

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

interface TableContentProps<T> {
    queryKey: string;
    columns: ColumnsType;
    defaultVisibleColumns: (keyof T | string)[]
    renderCells: React.ComponentType<{ item: T; columnKey: React.Key }>;
    renderFilters: React.ComponentType<FiltersProps>
    onCreate?: () => void;
    onEdit?: (item: string) => void;
    onDetails?: (item: T) => void;
    onAddParam: (key : string, value : string) => void;
    onDeleteParam: (key : string) => void
    onGetParam: (key: string) => string | null
}

export const options = [
    { value: "Todas", key: "all" },
    { value: "Disponible", key: "activo" },
    { value: "No Disponible", key: "inactivo" },
]

export default function TableContent<T>({
    queryKey,
    renderCells,
    columns,
    defaultVisibleColumns,
    renderFilters,
    onAddParam,
    onCreate,
    onEdit,
    onDetails,
    onDeleteParam,
    onGetParam
}: TableContentProps<T>) {

    console.log("Reentrando a table content")

    const { data, meta, isLoading, search, setSearch } = useSearch({
        baseKey: queryKey,
        functionService: servicesMap[queryKey],
    });

    const { selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, statusFilter, setStatusFilter, headerColumns } = useLogicTable({ defaultVisibleColumns, columns });

    const CellRenderer = renderCells;
    const Filters = renderFilters
    return (
        <Table
            isCompact
            aria-label={`${queryKey} table`}
            bottomContent={ <Pagination meta={meta} /> }
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
                    messageButton={"Agregar propiedad"}
                    onSearchChange={(value) => setSearch(value)}
                    onClear={() => {
                        setSearch("");
                        setStatusFilter("all");
                    }}
                    total={meta?.totalItems || 1}
                    renderFilters={
                        <Filters
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            visibleColumns={visibleColumns}
                            setVisibleColumns={setVisibleColumns}
                            statusOptions={options}
                            columns={columns}
                            setFilterValue={setSearch}
                            onAddParam={onAddParam}
                            onDeleteParam={onDeleteParam}
                            onGetParam={onGetParam}
                        />
                    }
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
                    <TableRow className="hover:bg-[#f3f4f6] dark:hover:bg-[#222225] dark:text-[#c9cacb]" key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                <CellRenderer
                                    item={item}
                                    columnKey={columnKey}
                                />
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}