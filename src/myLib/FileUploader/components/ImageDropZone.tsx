import LoadingEffect from "./LoadingEffect";
import ImageInfo from "./ImageInfo";
import { ImageDropZoneProps } from "../interfaces";

export default function ImageDropZone(props: ImageDropZoneProps) {
    const { isSingle, multiple, selectedFiles, maxFiles, isDragOver, handleDragOver, handleDragLeave, handleDrop, openFileSelector, handleFileSelect, removingIds, handleRemove, fileInputRef } = props;
    const shouldShowDropZone = multiple ? selectedFiles.length < maxFiles : true;

    if (!shouldShowDropZone) return null;

    return (
        <div
            className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 w-full
        ${isSingle ? 'h-80 overflow-hidden' : 'p-6 text-center h-36'}
        ${isDragOver ? "border-gray-400 bg-gray-50" : "border-gray-300 hover:border-gray-400"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileSelector}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {isSingle && selectedFiles.length > 0 && (
                <div className={`relative w-full h-full group transition-all duration-300 ${removingIds.has(selectedFiles[0].id) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    {selectedFiles[0].isLoading ? (
                        <LoadingEffect file={selectedFiles[0]} />
                    ) : (
                        <>
                            <img src={selectedFiles[0].preview} alt={selectedFiles[0].name} className="w-full h-full object-cover" />
                            <ImageInfo file={selectedFiles[0]} />
                            <button
                                onClick={() => handleRemove(selectedFiles[0].id)}
                                className="absolute top-[10px] left-2 z-10 w-6 h-6 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200 shadow-lg opacity-100 group-hover:opacity-100"
                                title="Eliminar imagen"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}

            {(isSingle ? selectedFiles.length === 0 : selectedFiles.length < maxFiles) && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center space-y-3 ${isSingle ? 'h-full p-6' : 'p-6'}`}>
                    <div className="p-3 rounded-full bg-gray-100">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={multiple ? "M12 6v6m0 0v6m0-6h6m-6 0H6" : "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"} />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                        {isDragOver ? (isSingle ? "¡Suelta tu imagen!" : "¡Suelta las imágenes!") : (isSingle ? "Sube una imagen" : `Agregar imágenes (${selectedFiles.length}/${maxFiles})`)}
                    </p>
                    <p className="text-xs text-gray-500">{isSingle ? "Arrastra aquí o haz click" : "Arrastra archivos o haz click"}</p>
                </div>
            )}
        </div>
    )
}
