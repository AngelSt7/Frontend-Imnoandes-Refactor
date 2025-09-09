'use client'
import { useAppStore } from '@/src/store/useAppStore';
import { Button } from '@heroui/react';
import { Drawer as DrawerComponent } from 'vaul';
import { IoClose } from "react-icons/io5";

interface DrawerProps {
    renderFilters: React.ReactNode;
}

export default function GenericDrawer({ renderFilters }: DrawerProps) {

    const statusDrawer = useAppStore(state => state.statusDrawer)
    const onChangeDrawer = useAppStore(state => state.onChangeDrawer)

    return (
        <>
            <DrawerComponent.Root open={statusDrawer} onClose={onChangeDrawer} direction="right">
                <DrawerComponent.Portal>
                    <DrawerComponent.Overlay className="fixed inset-0 bg-black/40" />
                    <DrawerComponent.Content
                        className="right-2 top-2 bottom-2 fixed z-20 outline-none w-[310px] flex"
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                            <div className=' space-y-3'>
                                <div className=' flex justify-between items-center'>
                                    <DrawerComponent.Title className="font-medium text-zinc-900">Filtros</DrawerComponent.Title>
                                    <Button radius='md' isIconOnly onPress={onChangeDrawer} size="sm">
                                        <IoClose className=' text-2xl' />
                                    </Button>
                                </div>
                                <div id="drawer-filters" className=' flex flex-col gap-4 z-50'>
                                    {renderFilters}
                                </div>
                            </div>
                        </div>
                    </DrawerComponent.Content>
                </DrawerComponent.Portal>
            </DrawerComponent.Root>
        </>
    )
}