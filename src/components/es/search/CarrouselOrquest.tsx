'use client'

import { Button } from '@heroui/react';
import { useState } from 'react';
import Carrousel from '../Carrousel/Carrousel';
import { CarrouselItem } from '@/src/types';
import CardCarrousel from './error/CardCarrousel';

interface CarrouselOrquestProps {
    SALE: CarrouselItem[]
    RENT: CarrouselItem[]
}

export default function CarrouselOrquest({ SALE, RENT }: CarrouselOrquestProps) {
    const [currentType, setCurrentType] = useState('SALE')

    const buttons = [
        { label: 'En venta', type: 'SALE', function: () => setCurrentType('SALE') },
        { label: 'En alquiler', type: 'RENT', function: () => setCurrentType('RENT') },
    ]

    return (
        <div className='w-full md:min-w-[50%] md:max-w-[1200px] mx-auto'>
            
            <div className='flex gap-3 items-center justify-start mb-4'>
                {buttons.map((button, index) => (
                    <Button
                        className={`text-large ${button.type === currentType ? "bg-zinc-800 text-white" : "bg-[#f3f7f8]  text-zinc-800"} py-3`}
                        key={index}
                        variant='bordered'
                        onPress={button.function}>
                        {button.label}
                    </Button>
                ))}
            </div>  

            <div> 
                <div className={`transition-opacity duration-300 ${currentType === 'SALE' ? 'opacity-100 z-10' : 'opacity-0 z-0 hidden'}`}>
                    <Carrousel<CarrouselItem> data={SALE} card={CardCarrousel} />
                </div>
                <div className={`transition-opacity duration-300 ${currentType === 'RENT' ? 'opacity-100 z-10' : 'opacity-0 z-0 hidden'}`}>
                    <Carrousel<CarrouselItem> data={RENT} card={CardCarrousel} />
                </div>
            </div>

        </div>
    )
}
