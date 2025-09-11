import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
};

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button 
      onClick={onClick}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:shadow-xl group/heart"
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-200 ${
          isFavorite 
            ? 'text-red-500 fill-red-500 scale-110' 
            : 'text-gray-600 hover:text-red-500 group-hover/heart:scale-110'
        }`}
      />
    </button>
  );
}
