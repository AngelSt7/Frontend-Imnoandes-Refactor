import { PropertyClient } from '@/src/services/client/property/property-client'
import Link from 'next/link'
import PreparedCarrousel from '../Carrousel/PreparedCarrousel'
import { CarrouselItem } from '../../../types/publicTypes/publicProperty';
import CarrouselOrquest from '../search/CarrouselOrquest';


export default async function DiscoverSection() {
  const [SALE, RENT] = await Promise.all([
    PropertyClient.carrousel('SALE'),
    PropertyClient.carrousel('RENT')
  ])

  if (!SALE || !RENT) return null

  return (
    <section className='flex flex-col md:flex-row space-y-10 justify-between w-full h-full mt-4 overflow-hidden'>
      <div className=' flex-1 flex flex-col justify-center items-start p-2 md:p-12 space-y-4 w-full xs:min-w-[50%]'>
        <h2 className=' text-4xl font-bold'>¿Conoces nuestras categorias de propiedades?</h2>
        <p>Puedes intercalar entre las propiedades de venta y de alquiler</p>
        <Link
          href={'/es/properties'}
          target='_blank'
          aria-label='Encontrar mi propiedad'
          className="border border-green-900 bg-green-50 font-bold text-zinc-800 w-full xs:w-1/2 py-3 rounded-2xl flex justify-center items-centerhover:bg-[#dde6e4] active:scale-95 transition-transform duration-150 ease-in-out hover:scale-105"
        >
          Encontrar mi propiedad
        </Link>

      </div>

        <CarrouselOrquest SALE={SALE} RENT={RENT} />

    </section>
  )
}
