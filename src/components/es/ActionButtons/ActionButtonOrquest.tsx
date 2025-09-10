'use client'

import { Button } from "@heroui/react"
import { useState } from "react"
import { TabContactContent, TabPostContent, TabRentContent, TabSaleContent } from "@/src/components/es/TabsActionsButtons"

export default function ActionButtonOrquest({ defaultTab }: { defaultTab: number }) {
    const [currentTab, setCurrentTab] = useState(defaultTab)
    const buttons = [
        { label: "Contactar", href: "/es/contact", tab: 1, component: TabContactContent },
        { label: "Alquilar", href: "/es/fqa", tab: 2, component: TabRentContent },
        { label: "Comprar", href: "/es/fqa", tab: 3, component: TabSaleContent },
        { label: "Publicar", href: "/es/fqa", tab: 4, component: TabPostContent },
    ]

    const getComponent = (tab: number) => {
        const button = buttons.find(button => button.tab === tab)
        return button?.component
    }
    const CurrentComponent = getComponent(currentTab)
    return (
        <div className=" flex flex-col gap-3 ">
            <div className="flex gap-3 items-center">
                {buttons.map((button) => (
                    <Button
                        className={button.tab === currentTab ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"}
                        key={button.label}
                        variant="bordered"
                        onPress={() => setCurrentTab(button.tab)}
                    >{button.label}</Button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                {CurrentComponent && <CurrentComponent />}
            </div>
        </div>
    )
}
