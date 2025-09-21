'use client'
import { useAppStore } from "@/src/store/useAppStore";
import { IoCall } from "react-icons/io5";

export default function TooltipContact() {
  const changeStatusModal = useAppStore((state) => state.changeStatusModal);
  
  return (
    <aside 
      className="xl:hidden fixed bottom-6 right-6 z-50 group" 
      aria-label="Botón flotante de contacto"
    >
      <div 
        className="absolute bottom-16 -left-24 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-3 group-hover:translate-y-0 pointer-events-none z-40"
        role="tooltip"
        id="contact-tooltip"
      >
        <div className="bg-white text-gray-800 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl border border-gray-100 backdrop-blur-lg relative">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>¿Necesitas ayuda?</span>
          </div>
          <p className="text-xs text-gray-600 mt-1 font-normal">Contáctanos ahora</p>
          
          <div className="absolute bottom-4 -right-2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-white"></div>
          <div className="absolute bottom-[15px] -right-[11px] w-0 h-0 border-t-[11px] border-b-[11px] border-l-[11px] border-t-transparent border-b-transparent border-l-gray-100"></div>
        </div>
      </div>

      <button
        onClick={() => changeStatusModal()}
        className="relative h-16 w-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-full text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 active:scale-95 group overflow-hidden ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 z-50 cursor-pointer"
        type="button"
        aria-label="Abrir formulario de contacto"
        aria-describedby="contact-tooltip"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <div className="absolute inset-0 rounded-full border border-white/20"></div>
        
        <IoCall className="w-8 h-8 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
        
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
      </button>

      <div className="absolute -top-1 -right-1 flex items-center justify-center">
        <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>

      <div className="absolute inset-0 rounded-full border-4 border-emerald-200 opacity-20 animate-ping animation-delay-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-emerald-300 opacity-10 animate-ping animation-delay-500" style={{ animationDelay: '1s' }}></div>
    </aside>
  );
}