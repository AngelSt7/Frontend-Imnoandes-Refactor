interface Props {
  mainImage: { url: string };
  images: { url: string }[];
  remainingCount: number;
  onImageClick: (img: any) => void;
}

export function HeaderImagesDesktop({ mainImage, images, remainingCount, onImageClick }: Props) {
  return (
    <div className="hidden lg:flex lg:gap-2 lg:h-[400px]">
      <div className="flex-1 group cursor-pointer overflow-hidden rounded-lg">
        <img
          src={mainImage.url}
          alt="Imagen principal"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(mainImage)}
        />
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="group cursor-pointer overflow-hidden rounded-lg relative">
            <img
              src={image.url}
              alt={`Galería ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => onImageClick(image)}
            />
            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-lg font-semibold">+{remainingCount} más</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
