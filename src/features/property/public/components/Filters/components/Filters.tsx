import CurrencyFilter from "@/src/features/property/public/components/Filters/components/Currency/CurrencyFilter"
import { useQueryParam } from "@/src/hooks/searchParams/useQueryParam";
import BedroomFilter from "./Bedrooms/BedroomFilter";
import ButtonSegment from "../ButtonSegment";
import AreaFilter from "./Area/AreaFilter";
import SelectNumbers from "@/src/myLib/Filters/SelectNumbers";
import ButtonFilter from "../ButtonFilter";

export type AllowedFilters = 'currency' | 'bedrooms' | 'bathrooms' | 'propertyType' | 'propertyCategory' | 'area' | 'minBathrooms' | 'minParkingSpaces' | 'published'

export interface FiltersProps {
    show: AllowedFilters[]
}

export default function Filters({ show }: FiltersProps) {

    const { setParam, getParam, deleteParams } = useQueryParam();

    return (
        <>
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
                <ButtonSegment
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
                    keyParam="published"
                    options={[
                        { key: "ALL", value: "Cualquier momento" },
                        { key: "0", value: "Hoy" },
                        { key: "3", value: "Últimos 3 días" },
                        { key: "7", value: "Últimos 7 días" },
                    ]}
                    defaultLabel="Todos"
                />
            )}
        </>
    )
}
