import { Button } from "@heroui/react";
import { ButtonFilter } from "@/src/myLib/components/Filters";
import { CURRENCY, DEPARTMENT, PAGINATION, PROPERTY_CATEGORY, PROPERTY_TYPE } from "./constants";
import { FilterColumns, FilterState } from "./components";
import { FiltersProps } from "@/src/myLib/components/Table";
import { TOP_CONTENT_SHOW } from "@/src/features/property/admin/interfaces";
import { useAppStore } from "@/src/store/useAppStore";
import { useQueryParam } from "@/src/myLib/hooks/searchParams";

export function Filters({
    show,
    visibleColumns,
    setVisibleColumns,
    columns
}: FiltersProps<TOP_CONTENT_SHOW>) {

    const onChangeDrawer = useAppStore(state => state.onChangeDrawer)
    const { keepParams, clearParams, getParam, setParam } = useQueryParam()
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
                    onPress={() => keepParams(["page", "limit"])}
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
                <ButtonFilter
                    classNames={classNames}
                    keyParam="limit"
                    options={PAGINATION}
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
                    onGetParam={getParam}
                    onAddParam={setParam}
                    onDeleteParam={clearParams}
                />
            )}

        </>
    )
}