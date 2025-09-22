import { CURRENCY, DEPARTMENT, PROPERTY_CATEGORY, PROPERTY_TYPE } from "./constants";
import { Button } from "@heroui/react";
import { FilterPagination, FilterColumns, FilterState } from "./components";
import { TOP_CONTENT_SHOW } from "@/src/features/property/admin/interfaces";

import { useAppStore } from "@/src/store/useAppStore";
import { useParams } from "@/src/hooks/search/useParams";
import { FiltersProps } from "@/src/myLib/components/Table";
import { ButtonFilter } from "@/src/features/property/public/components/Filters/components";

export function Filters({
    show,
    visibleColumns,
    setVisibleColumns,
    columns,
    onAddParam,
    onDeleteParam,
    onGetParam
}: FiltersProps<TOP_CONTENT_SHOW>) {

    const onChangeDrawer = useAppStore(state => state.onChangeDrawer)
    const { clearParams } = useParams()
    const classNames = 'border border-[#dbdada]'
    return (
        <>

            {show.includes("filters") && (
                <Button onPress={onChangeDrawer} size="md" variant="flat" className="w-full border border-[#dbdada]">
                    Filtrar
                </Button>
            )}

            {show.includes("clear") && (
                <Button
                    onPress={() => clearParams()}
                    size="md" variant="flat" className="w-full border border-[#dbdada]"
                >
                    Limpiar
                </Button>
            )}

            {show.includes("propertyCategory") &&
                <ButtonFilter
                    classNames={classNames}
                    keyParam="propertyCategory"
                    options={PROPERTY_CATEGORY}
                    defaultLabel="Cualquier moneda"
                />
            }

            {show.includes("propertyType") && (
                <ButtonFilter
                    classNames={classNames}
                    keyParam="propertyType"
                    options={PROPERTY_TYPE}
                    defaultLabel="Cualquier moneda"
                />
            )}

            {show.includes("pagination") && (
                <FilterPagination
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

            {show.includes("columns") && (
                <FilterColumns
                    classNames={classNames}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                />
            )}

            {show.includes("currency") && (
                <ButtonFilter
                    classNames={classNames}
                    keyParam="currency"
                    options={CURRENCY}
                    defaultLabel="Cualquier moneda"
                />
            )}

            {show.includes("departmentId") && (
                <ButtonFilter
                    classNames={classNames}
                    keyParam="departmentId"
                    options={DEPARTMENT}
                    defaultLabel="Cualquier departamento"
                />
            )}

            {show.includes("state") && (
                <FilterState
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

        </>
    )
}