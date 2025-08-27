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
    
    const styles = `right-2 top-2 bottom-2 fixed z-50 outline-none w-[99%] flex`
    const tittle = getTitle();
    
    return (
        <>
            {showModal && (
                <div 
                    className="fixed inset-0 bg-black/0 z-40"
                    onClick={closeModal} 
                />
            )}
            
            <DrawerComponent.Root 
                modal={false} 
                onClose={closeModal} 
                open={showModal} 
                direction="right"
            >
                <DrawerComponent.Portal>
                    <DrawerComponent.Content
                        className={styles}
                        style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                    >
                        {renderForm({ tittle })}
                    </DrawerComponent.Content>
                </DrawerComponent.Portal>
            </DrawerComponent.Root>
        </>
    )
}