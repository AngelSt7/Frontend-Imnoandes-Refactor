import { useAppStore } from "@/src/store/useAppStore";
import {
    Button,
} from "@heroui/react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface DrawerHero {
    renderFilters: React.ReactNode;
}

export default function DrawerHero({ renderFilters }: DrawerHero) {
    const statusDrawer = useAppStore(state => state.statusDrawer);
    const onChangeDrawer = useAppStore(state => state.onChangeDrawer);

    // Función para cerrar el drawer cuando se hace clic en el overlay
    const handleOverlayClick = () => {
        onChangeDrawer();
    };

    // Prevenir que el clic en el contenido del drawer cierre el drawer
    const handleDrawerContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Prevenir scroll del body cuando el drawer está abierto
    useEffect(() => {
        if (statusDrawer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [statusDrawer]);

    // Variantes de animación para el overlay
    const overlayVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: "easeIn"
            }
        }
    } as const

    // Variantes de animación para el drawer
    const drawerVariants = {
        hidden: {
            x: "100%",
        },
        visible: {
            x: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            }
        },
        exit: {
            x: "100%",
            transition: {
                duration: 0.3,
                ease: [0.55, 0.06, 0.68, 0.19],
            }
        }
    } as const

    return (
        <>
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
                            className="absolute  rounded-l-2xl  right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col"
                            variants={drawerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div onClick={handleDrawerContentClick} className="flex p-7 flex-col h-full">

                                <div className=' flex justify-between items-center mb-7'>
                                    <h2 className="font-medium text-2xl text-zinc-900">Filtros</h2>
                                    <Button radius='md' isIconOnly onPress={onChangeDrawer} size="sm">
                                        <IoClose className=' text-2xl' />
                                    </Button>
                                </div>
                                
                                <div className="flex-1 overflow-auto">
                                    <div id="drawer-filters" className='flex flex-col gap-4'>
                                        {renderFilters}
                                    </div>
                                </div>
                                
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}