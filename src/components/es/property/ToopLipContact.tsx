'use client'
import { useAppStore } from "@/src/store/useAppStore";
import { IoCall } from "react-icons/io5";

export default function ToopLipContact() {
    const changeStatusModal = useAppStore((state) => state.changeStatusModal)
    
    return (
        <div className="xmd:hidden fixed bottom-6 right-6 z-50 group">
            <div className="absolute bottom-16 -left-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                <div className="bg-gradient-to-r from-[#e3a400] to-[#f5b800] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20">
                    ¿Necesitas ayuda?
                    <div className="text-xs opacity-90 mt-1">Contáctanos ahora</div>
                    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#e3a400]"></div>
                </div>
            </div>
            
            <button 
                onClick={() => changeStatusModal()} 
                className="relative h-14 w-14 bg-gradient-to-br from-[#e3a400] via-[#f5b800] to-[#e3a400] rounded-full text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-95 group overflow-hidden"
                type="button"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
                
                <IoCall className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                
                <div className="absolute inset-0 rounded-full border-2 border-[#e3a400] opacity-0 group-hover:opacity-100 animate-ping"></div>
            </button>
            
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
            </div>
        </div>
    )
}