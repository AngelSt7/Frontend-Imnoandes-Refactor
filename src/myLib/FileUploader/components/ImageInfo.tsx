import { useEffect, useState } from "react";
import { formatFileSize, getImageDimensions } from "../utils/utils";
import { ImageItem } from "../interfaces";

interface ImageInfoProps {
  file: ImageItem;
}

export default function ImageInfo({ file }: ImageInfoProps) {
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (file.preview) getImageDimensions(file).then(setDimensions)
  }, [file.preview])

  return (
    <div className="absolute rounded-2xl inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent text-white p-2 transition-all duration-200 flex flex-col justify-between">
      <div className="ml-8">
        <p className="text-xs font-medium truncate">
          {file.originalFile?.name ?? file.name}
        </p>
        <div className="text-xs opacity-80 flex gap-1 items-center">
          {!file.name && <p>{formatFileSize(file)},</p>}
          {dimensions.width > 0 && dimensions.height > 0 && (
            <p>{dimensions.width} × {dimensions.height}px</p>
          )}
        </div>
      </div>
    </div>
  )
}