'use client'

import { usePathname } from 'next/navigation'
import Menu from '../dashboard/ui/Menu'
import { messages } from '@/src/utils/frontend/ui/messagesUtils'
import { Button } from '@heroui/react'
import { useModalUtils } from '../../hooks/modal/useModalUtils';

export default function Navigation() {
    const { openModalCreate } = useModalUtils();
    const path = usePathname()

    const getPageType = (path: string) => {
        if (path.includes('create')) return 'create'
        if (path.includes('edit')) return 'edit'
        if (path.includes('view')) return 'view'
        if (path === '/dashboard/properties') return 'properties'
        if (path === '/dashboard/profile') return 'profile'
        return 'default'
    }

    const pageType = getPageType(path)
    const currentMessages = messages[pageType]

    return (
        <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center space-x-4">
                    <div>
                        <div className='flex gap-3'>
                            {path === '/dashboard/properties' ?
                                currentMessages.icon
                                :
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                    {currentMessages.icon}
                                </div>
                            }
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {currentMessages.title}
                                </h1>
                            </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {currentMessages.description}
                        </p>
                    </div>

                    <div className=' flex gap-3 items-center'>
                        <Button 
                            onPress={openModalCreate}
                            type='submit'
                            radius='full'
                            className='px-4 py-2 rounded-full text-sm font-medium border transition flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-foreground-100 border-zinc-300'>
                            Agregar propiedad
                        </Button>
                        <Menu />
                    </div>
                </div>
            </div>
        </div>
    )
}