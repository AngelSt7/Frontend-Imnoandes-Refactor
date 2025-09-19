import { X } from "lucide-react";

export function CloseButton({ closeOverlay }: { closeOverlay: () => void }) {
    return (
        <button
            onClick={closeOverlay}
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-50"
        >
            <X size={32} />
        </button>
    )
}
