'use client';

import { Meta } from '../../../../../schema/shared/meta';
import { CardProperty, LocationsSearch, PropertySearch } from '@/src/features/property';
import FilterOrquest from '../Filters/components/FilterOrquest';
import { StickyContent } from '@/src/myLib';
import { NotFound } from './components/NotFound/NotFound';

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
        <>
            <StickyContent classNames='backdrop-blur-md backdrop-saturate-150 shadow-sm bg-[#f5f5f5] border-b border-[#d1d5db]'>
                <FilterOrquest locales={locales} />
            </StickyContent>

            <section className="w-[98%] lg:w-[90%] max-w-[1600px] mx-auto space-y-6 mb-10 md:mt-5 mt-2">

                {data.data.length > 0 && (
                    <p className='text-zinc-800 font-medium'>
                        {`Mostrando ${data.meta.itemCount} propiedades de ${data.meta.totalItems}`}
                    </p>
                )}

                {data.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-5 mt-5">
                            {data.data.map(property => (
                                <CardProperty key={property.id} property={property} />
                            ))}
                        </div>
                    </>
                ) : (
                    <NotFound />
                )}
            </section>
        </>
    );
}