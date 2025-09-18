import { Building, Building2, Home, Store, Trees, Warehouse } from "lucide-react";
import { useQueryParam } from "@/src/myLib/hooks/searchParams/useQueryParam";
import { SelectSEO, SelectNumbers } from "@/src/myLib/components";
import { Button } from "@heroui/react";
import { useAppStore } from "@/src/store/useAppStore";
import { AreaFilter, BedroomFilter, CurrencyFilter, ButtonFilter } from '.';
import { AllowedFilters } from "../interfaces/interface";
import { useDrawerContext } from "@/app/success/DrawerContext";

export interface FiltersProps {
    show: AllowedFilters[]
}

const options = [
    { key: "APARTMENT", icon: Building2, label: "Departamento", slug: "departamentos" },
    { key: "HOUSE", icon: Home, label: "Casa", slug: "casas" },
    { key: "WAREHOUSE", icon: Warehouse, label: "Almacenes", slug: "almacenes" },
    { key: "LAND", icon: Trees, label: "Terreno / Lote", slug: "terrenos" },
    { key: "OFFICE", icon: Building, label: "Oficina comercial", slug: "oficinas" },
    { key: "COMMERCIAL", icon: Store, label: "Local comercial", slug: "locales-comerciales" },
];


const propertyTypes = [
    { key: "SALE", icon: Building2, label: "Venta", slug: "venta" },
    { key: "RENT", icon: Home, label: "Alquiler", slug: "alquiler" }
];

export function Filters({ show }: FiltersProps) {

    const { setParam, getParam, deleteParams } = useQueryParam();
    const onChangeDrawer = useAppStore(state => state.onChangeDrawer)
    const { isInDrawer: inProvider } = useDrawerContext();

    return (
        <>
            {show.includes("filters") && (
                <Button onPress={onChangeDrawer} size="md" variant="flat" className="w-full md:w-fit border border-[#dbdada]">
                    Filtrar
                </Button>
            )}

            {show.includes("clear") && (
                <Button
                    onPress={() => deleteParams([
                        'currency',
                        'bedrooms',
                        'bathrooms',
                        'propertyType',
                        'propertyCategory',
                        'area',
                        'minBathrooms',
                        'minParkingSpaces',
                        'published',
                        'propertyCategory',
                    ])}
                    size="md" variant="flat" className="w-full border border-[#dbdada]"
                >
                    Limpiar
                </Button>
            )}

            {show.includes('currency') && (
                <CurrencyFilter
                    setParam={setParam}
                    getParam={getParam}
                    deleteParams={deleteParams}
                />
            )}

            {show.includes('bedrooms') && (
                <BedroomFilter
                    setParam={setParam}
                    getParam={getParam}
                    deleteParams={deleteParams}
                />
            )}

            {show.includes('propertyType') && (
                <SelectSEO
                    regex={/^(.*\/search\/)([^\/\-]+)(-.*)?(\?.*)?$/}
                    mode="single"
                    options={propertyTypes}
                    prefix=""
                    inProvider={inProvider}
                    onChange={onChangeDrawer}
                />
            )}

            {show.includes('propertyCategory') && (
                <SelectSEO
                    regex={/^(.*\/search\/[^\/]+)-de-([^\/\?]+?)(-en-.*)?(\?.*)?$/}
                    mode="multiple"
                    options={options}
                    prefix="-de-"
                    inProvider={inProvider}
                    onChange={onChangeDrawer}
                />
            )}


            {show.includes('area') && (
                <AreaFilter
                    setParam={setParam}
                    getParam={getParam}
                    deleteParams={deleteParams}
                />
            )}

            {show.includes('minBathrooms') && (
                <SelectNumbers
                    keyParam="minBathrooms"
                    options={[
                        { key: "1", value: "1+" },
                        { key: "2", value: "2+" },
                        { key: "3", value: "3+" },
                        { key: "4", value: "4+" },
                        { key: "5", value: "5+" },
                    ]}
                    tittle="Baños"
                />
            )}

            {show.includes('minParkingSpaces') && (
                <SelectNumbers
                    keyParam="minParkingSpaces"
                    options={[
                        { key: "1", value: "1+" },
                        { key: "2", value: "2+" },
                        { key: "3", value: "3+" },
                        { key: "4", value: "4+" },
                        { key: "5", value: "5+" },
                    ]}
                    tittle="Parqueaderos"
                />
            )}

            {show.includes('published') && (
                <ButtonFilter
                    text="Publicado"
                    keyParam="published"
                    options={[
                        { key: "ALL", value: "Cualquier momento" },
                        { key: "0", value: "Hoy" },
                        { key: "3", value: "Últimos 3 días" },
                        { key: "7", value: "Últimos 7 días" },
                    ]}
                    defaultLabel="En cualquier momento"
                />
            )}
        </>
    )
}
