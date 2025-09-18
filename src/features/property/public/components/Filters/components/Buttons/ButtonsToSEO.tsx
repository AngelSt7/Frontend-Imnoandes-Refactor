import { Button } from '@heroui/react'

interface ButtonsProsp {
    onSubmit: () => void
}

export function ButtonsToSEO({ onSubmit }: ButtonsProsp) {
    return (
        <footer className={` flex gap-2 p-2 border-t border-gray-200 justify-end`}>
            <Button type="button" onPress={onSubmit} size="sm" className="bg-teal-600 text-white hover:bg-teal-700 transition-colors">
                Ver resultados
            </Button>
        </footer>
    )
}
