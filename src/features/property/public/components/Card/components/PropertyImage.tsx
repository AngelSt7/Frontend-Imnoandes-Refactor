import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';

type PropertyImageProps = {
  images?: { type: string; url: string }[] | null;
  location: string;
};

export function PropertyImage({ images, location }: PropertyImageProps) {
  if (!images || images.length === 0) {
    return (
      <figure className="relative w-full md:w-[320px] lg:h-full lg:w-[425px] flex-shrink-0 overflow-hidden">
        <Image
          alt={`Imagen de la propiedad en ${location}`}
          src={'https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg'}
          width={425}
          height={295}
          className="object-cover w-full h-full"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 425px"
        />
      </figure>
    );
  }

  return (
    <div className="relative w-full md:w-[320px] lg:h-full lg:w-[425px] flex-shrink-0 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true} 
        autoplay={{
          delay: 3000,    
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.url}
              alt={`Imagen ${i + 1} de ${location}`}
              width={425}
              height={295}
              className="object-cover w-full h-full"
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
