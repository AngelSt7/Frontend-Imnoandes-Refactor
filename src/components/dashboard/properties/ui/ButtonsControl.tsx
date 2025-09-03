import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc"

interface ButtonsControlProps {
    canGoNext: () => boolean
    canGoPrev: () => boolean
    goToNextStep: () => void
    goToPrevStep: () => void
    validationMode?: "block" | "message"
}

export default function ButtonsControl({ canGoNext, canGoPrev, goToNextStep, goToPrevStep, validationMode = 'message' }: ButtonsControlProps) {
    const buttons = [
        {
            id: 'prev',
            label: 'Anterior',
            icon: VscTriangleLeft,
            iconPosition: 'left' as const,
            onClick: goToPrevStep,
            canExecute: canGoPrev
        },
        {
            id: 'next',
            label: 'Siguiente',
            icon: VscTriangleRight,
            iconPosition: 'right' as const,
            onClick: goToNextStep,
            canExecute: canGoNext
        }
    ]

    return (
        <div className='flex justify-center gap-2'>
            {buttons.map(({ id, label, icon: Icon, iconPosition, onClick, canExecute }) => {
                let isDisabled 
                validationMode === 'block' ? isDisabled = !canExecute() : isDisabled = false
                
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={onClick}
                        disabled={isDisabled}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition flex items-center gap-2
                                    ${isDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-foreground-100"}`}
                    >
                        {iconPosition === 'left' && (
                            <Icon className='text-gray-500 dark:text-foreground-200 font-bold text-2xl' />
                        )}
                        {label}
                        {iconPosition === 'right' && (
                            <Icon className='text-gray-500 dark:text-foreground-200 font-bold text-2xl' />
                        )}
                    </button>
                )
            })}
        </div>
    )
}