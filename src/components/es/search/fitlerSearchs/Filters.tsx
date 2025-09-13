'use client'
import SelectFilter from './SelectFilter'
import ModalFilterts from './modal/ModalFilterts'

export default function Filters() {
    return (
        <div className="bg-white dark:bg-transparent p-2 rounded-xl">
            <div className='hidden md:flex items-center justify-center w-11/12 max-w-[1400px] mx-auto gap-4'>
                <SelectFilter />
            </div>
            <div className=' flex md:hidden'>
                <ModalFilterts />
            </div>
        </div>
    )
}
