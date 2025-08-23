'use client'

import { useRef } from 'react';
import { useGenericDrawer } from '@/src/hooks/drawer/useGenericDrawer';
import { Drawer as DrawerComponent } from 'vaul';

interface DrawerProps {
    width: string
    descriptionDrawer: string
}

export default function GenericDrawer({ width = '99', descriptionDrawer }: DrawerProps) {
    const { getTitle, renderForm, closeModal, showModal } = useGenericDrawer()
    const drawerContentRef = useRef<HTMLDivElement>(null);
    
    const styles = `right-2 top-2 bottom-2 fixed z-50 outline-none w-[${width}%] flex`
    const tittle = getTitle();
    
    return (
        <DrawerComponent.Root modal={false} onClose={closeModal} open={showModal} direction="right">
            <DrawerComponent.Portal>
                <DrawerComponent.Overlay className="fixed inset-0 bg-black/40" />
                <DrawerComponent.Content
                    className={styles}
                    style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                >
                    <div className="bg-green-400 h-full w-full grow p-5 flex flex-col rounded-[16px] relative" ref={drawerContentRef}>
                        <div className="absolute left-5 top-1/2 w-1.5 h-12 bg-gray-300 rounded-full transform -translate-y-1/2" />

                        <div className="bg-blue-300 w-full h-full grid grid-cols-3 grid-rows-1">
                            <div className='col-span-2'>
                                <DrawerComponent.Title className="font-medium mb-2 text-zinc-900">{tittle}</DrawerComponent.Title>
                                <DrawerComponent.Description className="text-zinc-600 mb-2">
                                    {descriptionDrawer}
                                </DrawerComponent.Description>
                            </div>
                            <div className='col-start-3 bg-red-300 w-full'>
                                {/* Pasar la referencia del drawer al ImageManager */}
                                {renderForm({ drawerRef: drawerContentRef })}
                            </div>
                        </div>
                    </div>
                </DrawerComponent.Content>
            </DrawerComponent.Portal>
        </DrawerComponent.Root>
    )
}