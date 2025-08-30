import { ImageGridProps } from "../interfaces";
import ImageInfo from "./ImageInfo";
import LoadingEffect from "./LoadingEffect";


export default function ImageGrid({ files, handleRemove, removingIds }: ImageGridProps) {
  if (!files.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map(file => (
        <div
          key={file.id}
          className={`relative group transition-all duration-300 transform ${
            removingIds.has(file.id) 
              ? 'opacity-0 scale-95 -translate-y-2' 
              : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          {!file.isLoading && (
            <div>
              <button
                onClick={() => handleRemove(file.id)}
                className="absolute top-[10px] left-2 z-10 w-6 h-6 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200 shadow-lg"
                title="Eliminar imagen"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ImageInfo file={file} />
            </div>
          )}
          <div className="w-full h-60 border border-gray-200 rounded-2xl overflow-hidden">
            {file.isLoading ? (
              <LoadingEffect file={file} />
            ) : (
              <img
                src={file.preview || file.url} // Usar preview para files o url para URLs
                alt={file.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  console.error(`Error loading image: ${file.name}`)
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}