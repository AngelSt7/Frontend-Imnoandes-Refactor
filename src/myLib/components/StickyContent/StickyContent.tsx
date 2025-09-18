import { useHideOnScroll } from "@/src/myLib/hooks";

export function StickyContent({ children, classNames }: { children: React.ReactNode, classNames?: string }) {
    const show = useHideOnScroll();
    
    return (
        <div className="sticky top-[82px] left-0 right-0 z-40">
            <div className={`${show ? "translate-y-0" : "-translate-y-[82px]"} ${classNames} transition-transform duration-500 ease-in-out`}>
                {children}
            </div>
        </div>
    )
}
