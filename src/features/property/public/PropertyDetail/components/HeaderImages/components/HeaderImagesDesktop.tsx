import Image from "next/image";

interface Props {
  mainImage: { url: string };
  images: { url: string }[];
  remainingCount: number;
  onImageClick: (img: any) => void;
}

export function HeaderImagesDesktop({
  mainImage,
  images,
  remainingCount,
  onImageClick,
}: Props) {
  return (
    <div className="hidden lg:flex lg:gap-2 lg:h-[400px]">
      <figure className="flex-1 group cursor-pointer overflow-hidden rounded-lg relative">
        <Image
          src={mainImage.url}
          alt="Imagen principal de la propiedad"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(mainImage)}
        />
        <figcaption className="sr-only">
          Imagen principal de la propiedad
        </figcaption>
      </figure>

      <div className="flex-1 grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <figure
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg relative"
          >
            <Image
              src={image.url}
              alt={`Galería ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => onImageClick(image)}
            />
            <figcaption className="sr-only">
              Imagen {index + 1} de la galería
            </figcaption>

            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-lg font-semibold">
                  +{remainingCount} más
                </span>
              </div>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
