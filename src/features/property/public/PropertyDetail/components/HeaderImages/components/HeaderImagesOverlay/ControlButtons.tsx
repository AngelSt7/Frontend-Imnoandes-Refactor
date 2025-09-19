import { ChevronLeft, ChevronRight, X } from "lucide-react"

type ControlButtonsProps = {
    controlButton: 'next' | 'prev' | 'close'
    closeOverlay?: () => void
    showPrev?: () => void
    showNext?: () => void
}

export function ControlButtons({ controlButton, closeOverlay, showPrev, showNext }: ControlButtonsProps) {

    switch (controlButton) {
        case 'close':
            return (
                <button
                    onClick={closeOverlay}
                    className="absolute top-6 right-6 text-white hover:text-gray-300 z-50"
                >
                    <X size={32} />
                </button>
            )
        case 'prev':
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        showPrev?.()
                    }}
                    className="absolute left-6 text-white hover:text-gray-300 z-50"
                >
                    <ChevronLeft size={40} />
                </button>
            )

        case 'next':
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        showNext?.()
                    }}
                    className="absolute right-6 text-white hover:text-gray-300 z-50"
                >
                    <ChevronRight size={40} />
                </button>
            )
    }
}
