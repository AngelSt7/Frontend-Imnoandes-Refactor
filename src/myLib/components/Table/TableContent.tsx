'use client'
import { useSearch } from "@/src/hooks/search/useSearch";
import {Pagination} from "../Pagination";
import { Spinner, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table } from "@heroui/react";
import { TableContentProps } from "./interfaces";
import { ColumnsType } from "./interfaces";
import { useLogicTable } from "./hooks";

export function TableContent<T, F>({
    baseKey,
    renderCells,
    topContent,
    columns,
    defaultVisibleColumns,
    renderFilters,
    renderCellsProps,
    getRowId,
    onList,
    onAddParam,
    onDeleteParam,
    onGetParam
}: TableContentProps<T, F>) {

    const { data, meta, isLoading, search, setSearch } = useSearch<T>({
        baseKey: baseKey,
        functionService: (filters) => onList(filters),
    });

    const { selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, setStatusFilter, headerColumns } = useLogicTable({ defaultVisibleColumns, columns });

    const CellRenderer = renderCells;
    const Filters = renderFilters
    const TopContent = topContent

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
                {(column : ColumnsType[number]) => (
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