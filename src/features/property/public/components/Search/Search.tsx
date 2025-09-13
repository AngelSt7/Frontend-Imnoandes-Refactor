'use client';
import { Meta } from '../../../../../schema/shared/meta';
import { CardProperty, PropertySearch } from '@/src/features/property';
import ButtonFilter from '../Filters/ButtonFilter';
import { currency } from '@/src/hooks/ui/filter/currency/useFilterCurrency';
import { useRouter } from 'next/navigation';
import Filters from '../Filters/components/Filters';
import FilterOrquest from '../Filters/components/FilterOrquest';
import MultiSelect from '@/src/myLib/MultiSelect/components/MultiSelect';

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

interface SearchProps {
    data: ApiResponse<PropertySearch>
}

export function Search({ data }: SearchProps) {

    const router = useRouter();
    return (
        <main className=" w-[98%] lg:w-[90%] max-w-[1600px] mx-auto space-y-6 mb-10 md:mt-5 mt-2  ">

            <FilterOrquest filters={(show) => (
                <Filters show={show} />
                )}
            />

            <MultiSelect />
            


            <button
                onClick={() => router.push('/es/search/venta-de-casas')}
            >
                Press me
            </button>
            <ButtonFilter keyParam={'currency'} options={currency} />
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
