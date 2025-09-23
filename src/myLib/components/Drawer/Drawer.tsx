import { Button } from "@heroui/react";
import { createPortal } from "react-dom";
import { DrawerProvider } from "./contexts";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/src/store/useAppStore";
import { useDrawer } from "./hooks";

export function Drawer({ renderFilters }: { renderFilters: React.ReactNode }) {
  const statusDrawer = useAppStore((state) => state.statusDrawer);
  const onChangeDrawer = useAppStore((state) => state.onChangeDrawer);
  
  if (typeof window === "undefined") return null;
  
  const { handleOverlayClick, handleDrawerContentClick, overlayVariants, drawerVariants } = useDrawer({ onChangeDrawer, statusDrawer });

  return createPortal(
    <AnimatePresence>
      {statusDrawer && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            className="absolute rounded-l-2xl right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              onClick={handleDrawerContentClick}
              className="flex p-7 flex-col h-full"
            >
              <div className="flex justify-between items-center mb-7">
                <h2 className="font-medium text-2xl text-zinc-900">Filtros</h2>
                <Button radius="md" isIconOnly onPress={onChangeDrawer} size="sm">
                  <IoClose className="text-2xl" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto w-full">
                <div id="drawer-filters" className="flex flex-col gap-4 w-full">
                  <DrawerProvider isInDrawer={true}>
                    {renderFilters}
                  </DrawerProvider>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}