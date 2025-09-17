'use client';

import { Meta } from '../../../../../schema/shared/meta';
import { CardProperty, LocationsSearch, PropertySearch } from '@/src/features/property';
import Filters from '../Filters/components/Filters';
import FilterOrquest from '../Filters/components/FilterOrquest';

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

interface SearchProps {
    data: ApiResponse<PropertySearch>
    locales: LocationsSearch | undefined
}

export function Search({ data, locales }: SearchProps) {

    return (
        <main className=" w-[98%] lg:w-[90%] max-w-[1600px] mx-auto space-y-6 mb-10 md:mt-5 mt-2  ">

            <FilterOrquest locales={locales} renderFilters={(show) => (
                <Filters show={show} /> )}
            />

            <p className='text-zinc-800 font-medium'>{`Mostrando ${data.meta.itemCount} propiedades de ${data.meta.totalItems}`}</p>
            {
                data.data.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-5 mt-5">
                            {data.data.map(property => (
                                <CardProperty key={property.id} property={property} />
                            ))}
                        </div>
                    </>
                )
            }
        </main>
    );
}