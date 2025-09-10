interface CardActionProps {
    title: string
    description: string
    icon: React.ReactNode
    highlightButton?: boolean
    highlightButtonColor?: string
    requiredButton?: boolean
    buttonText?: string
    iconHover?: string
    bgColor?: string
    buttonTextColor?: string
    bgHoverColor?: string // ej: "hover:bg-blue-50"
    borderHoverColor?: string // ej: "hover:border-blue-200"
    onClick?: () => void
}

export function CardAction({
    title,
    requiredButton = true,
    description,
    icon,
    bgColor,
    iconHover = 'bg-red-100 group-hover:bg-gray-200 ',
    buttonText,
    highlightButton = false,
    highlightButtonColor = 'bg-orange-600',
    buttonTextColor = 'text-blue-600',
    bgHoverColor = 'hover:bg-gray-50',
    borderHoverColor = 'hover:border-gray-300',
    onClick
}: CardActionProps) {

    const highlightButtonStyle = highlightButton
        ? `${highlightButtonColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center`
        : `flex items-center text-sm font-medium ${buttonTextColor}`

    return (
        <article
            className={`rounded-xl border p-6 shadow-sm transition-all cursor-pointer group relative overflow-hidden ${bgColor && bgColor} ${bgHoverColor} ${borderHoverColor}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyUp={(e) => e.key === 'Enter' && onClick?.()}
        >
            <div className="flex items-start gap-4">
                {/* icon con hover de fondo */}
                <div className={`p-3 rounded-lg transition-colors ${iconHover}` } aria-hidden="true">
                    {icon}
                </div>
                <div className="flex-1">
                    <header>
                        {/* h3 con hover */}
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                            {title}
                        </h3>
                    </header>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                    {requiredButton && (
                        <div className={highlightButtonStyle}>
                            <span>{buttonText}</span>
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
