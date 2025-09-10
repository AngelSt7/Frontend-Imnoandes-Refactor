'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface CarrouselProps<T> {
    data: T[]
    card: React.ComponentType<any>
}

export default function Carrousel<T>({ data, card } : CarrouselProps<T>) {
        const Card = card

        return (

            <div className="relative">

                <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-sm">
                    <ChevronRight className="w-5 h-5" />
                </button>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    slidesPerView="auto"
                    spaceBetween={20}
                    centeredSlides={false}
                    initialSlide={0}
                    breakpoints={{
                        0: { slidesPerView: 1.2, spaceBetween: 20 },
                        550: { slidesPerView: 1.7, spaceBetween: 20 },
                        700: { slidesPerView: 2.4, spaceBetween: 20 },
                        768: { slidesPerView: 1.2, spaceBetween: 20 },
                        950: { slidesPerView: 1.5, spaceBetween: 20 },
                        1100: { slidesPerView: 1.8, spaceBetween: 20 },
                        1400: { slidesPerView: 2.2, spaceBetween: 20 },
                    }}
                    className="w-full mt-8"
                >

                    {data.map((item, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <Card item={item} />
                        </SwiperSlide>
                    ))} 

                </Swiper>
            </div >
    )
}
