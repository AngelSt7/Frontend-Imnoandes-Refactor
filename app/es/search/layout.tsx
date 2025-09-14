'use client'
import React from 'react'

export default function layout({ children }: { children: { children: React.ReactNode } }) {
    return (
        <>
            <div className="flex items-center gap-4 bg-white dark:bg-transparent p-2 ">
                <div className='w-11/12 max-w-[1400px] mx-auto'>
                </div>
            </div>
            {children}
        </>
    )
}
