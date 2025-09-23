import { Button } from "@heroui/react";

export function AddButton({ onPress, label } : { onPress: () => void, label: string }) {
    return (
        <Button
            onPress={() => onPress()}
            type='submit'
            radius='full'
            className='w-full px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition flex items-center gap-2 bg-gray-100 hover:bg-gray-50 shadow-sm hover:shadow-md '
        >
            {label}
        </Button>
    )
}
