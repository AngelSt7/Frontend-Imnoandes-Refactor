import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageItem } from "../interfaces"

export default function LoadingEffect({ file }: { file: ImageItem }) {
  const progress = file.loadingProgress || 0
  const isLoading = progress < 100

  return (
    <motion.div
      layout
      initial={{ height: 70, opacity: 1 }}
      animate={{ 
        height: isLoading ? 70 : 220, 
        opacity: 1,
        scale: isLoading ? 1 : [1, 1.05, 0.98, 1.02, 1] 
      }}
      transition={{
        height: {
          type: "spring",
          stiffness: 60,
          damping: 8,
          mass: 1,
        },
        scale: {
          duration: 0.6,
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: "easeOut"
        }
      }}
      className="w-full relative rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between w-full px-4"
          >
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-gray-600 truncate">
                {file.originalFile?.name || file.name}
              </p>
              <p className="text-xs text-gray-400">
                {progress > 0 ? `${Math.round(progress)}%` : "Cargando..."}
              </p>
            </div>
            <div className="w-5 h-5 ml-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        ) : (
          <motion.img
            key="preview"
            src={file.preview || file.url}
            alt={file.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,   
              mass: 0.8,
              delay: 0.1, 
            }}
            className="w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}