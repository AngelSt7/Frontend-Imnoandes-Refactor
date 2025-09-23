import { Button } from '@heroui/react'

export function ButtonSubmit() {
    return (
        <div className='w-full'>
            <div className='flex justify-end'>
                <Button type='submit' radius='full' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-[30%]'>
                    Finalizar
                </Button>
            </div>
        </div>
    )
}
