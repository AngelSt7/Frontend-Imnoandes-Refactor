'use client'

import Carrousel from './Carrousel'
import CardCarrousel from '../search/error/CardCarrousel'

interface PreparedCarrouselProps<T> {
    data: T[]
}

export default function PreparedCarrousel<T>({ data }: PreparedCarrouselProps<T>) {

    return (
        <Carrousel<T>
            data={data}
            card={CardCarrousel}
        />
    )
}
