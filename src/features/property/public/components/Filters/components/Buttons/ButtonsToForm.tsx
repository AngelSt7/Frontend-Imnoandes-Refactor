import { Button } from '@heroui/react'

interface ButtonsToFormProps {
    handleClearParams: () => void
}

export function ButtonsToForm({ handleClearParams }: ButtonsToFormProps) {
    return (
        <div className="flex justify-between gap-2 p-2 mt-6 border-t border-gray-200">
            <Button variant="light" onPress={handleClearParams} size="sm" className="text-gray-600">
                Limpiar
            </Button>
            <Button type="submit" size="sm" className="bg-teal-700 text-white hover:bg-teal-800 transition-colors">
                Ver resultados
            </Button>
        </div>
    )
}
