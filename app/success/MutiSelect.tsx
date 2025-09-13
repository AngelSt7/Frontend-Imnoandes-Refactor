'use client'
import React from "react";
import { Checkbox, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Datos de tipos de propiedades con emojis
export const propertyTypes = [
    { key: "APARTMENT", emoji: "🏢", label: "Departamento", slug: "departamentos" },
    { key: "HOUSE", emoji: "🏠", label: "Casa", slug: "casas" },
    { key: "WAREHOUSE", emoji: "🏭", label: "Almacenes", slug: "almacenes" },
    { key: "LAND", emoji: "🌾", label: "Terreno / Lote", slug: "terrenos" },
    { key: "OFFICE", emoji: "🏢", label: "Oficina comercial", slug: "oficinas" },
    { key: "COMMERCIAL", emoji: "🏪", label: "Local comercial", slug: "locales-comerciales" }
];

type PropertyType = {
    key: string;
    emoji: string;
    label: string;
    slug: string;
};

export default function PropertyTypeSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    // 🔎 Extraer slugs desde la URL
    const getSlugsFromPath = (path: string) => {
        const cleanPath = path.split("?")[0];
        const match = cleanPath.match(/-de-([^/]+?)(?:-en-|$)/);
        if (!match) return [];
        return match[1].split("-o-"); // separar slugs
    };

    // Estado inicial sincronizado con la URL
    const selectedKeysFromUrl = React.useMemo(() => {
        const slugs = getSlugsFromPath(pathname);
        const keys = propertyTypes
            .filter(pt => slugs.includes(pt.slug))
            .map(pt => pt.key)
        return new Set(keys);
    }, [pathname]);

    // 🔹 Estado temporal (lo que el usuario va seleccionando)
    const [tempKeys, setTempKeys] = React.useState<Set<string>>(selectedKeysFromUrl);

    // Mantener en sync cuando cambia la URL desde afuera
    React.useEffect(() => {
        setTempKeys(selectedKeysFromUrl);
    }, [selectedKeysFromUrl]);

    // 🔧 Construir URL con los seleccionados
    const buildSearchUrl = (selectedItems: PropertyType[]) => {
        const currentParams = new URLSearchParams(params.toString());
        const currentPath = pathname.split("?")[0];
        let baseUrl = "";
        let locationPart = "";

        const locationMatch = currentPath.match(/-en-([^/]+)/);
        if (locationMatch) {
            locationPart = `-en-${locationMatch[1]}`;
            baseUrl = currentPath.split("-en-")[0];
        } else {
            baseUrl = currentPath;
        }

        const propertyTypesText = selectedItems.map(item => item.slug).join("-o-");
        let url = "";

        if (baseUrl.includes("venta-de-") || baseUrl.includes("alquiler-de-")) {
            const baseMatch = baseUrl.match(/(.*?-de-)/);
            if (baseMatch) {
                url = `${baseMatch[1]}${propertyTypesText}${locationPart}`;
            }
        } else {
            url = `/es/search/venta-de-${propertyTypesText}${locationPart}`;
        }

        // 🚀 conservar query params
        if (currentParams.toString()) {
            url += `?${currentParams.toString()}`;
        }
        return url;
    };

    // 🚀 Confirmar cambios y actualizar la URL
    const handleConfirm = () => {
        const selectedItems = propertyTypes.filter(item =>
            Array.from(tempKeys).includes(item.key)
        );
        const newUrl = buildSearchUrl(selectedItems);
        if (newUrl) router.push(newUrl);
    };

    // 🔧 Limpiar selección
    const handleClear = () => {
        setTempKeys(new Set());
    };

    // 🔧 Manejar cambio de checkbox individual
    const handleCheckboxChange = (propertyId: string, isSelected: boolean) => {
        const newKeys = new Set(tempKeys);
        if (isSelected) {
            newKeys.add(propertyId);
        } else {
            newKeys.delete(propertyId);
        }
        setTempKeys(newKeys);
    };

    // 🔧 Obtener texto para mostrar en el trigger
    const getTriggerText = () => {
        const selectedItems = propertyTypes.filter(item =>
            Array.from(selectedKeysFromUrl).includes(item.key)
        );

        if (selectedItems.length === 0) {
            return "Tipo de inmueble";
        } else if (selectedItems.length === 1) {
            return selectedItems[0].label;
        } else {
            return `${selectedItems.length} tipos seleccionados`;
        }
    };

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" color="secondary">{getTriggerText()}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="w-full">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h3 className="font-medium text-gray-900">Tipo de inmueble</h3>
                        </div>

                        <div className="p-2 space-y-2 max-h-52 overflow-y-auto">
                            {propertyTypes.map((propertyType) => (
                                <Checkbox
                                    key={propertyType.key}
                                    isSelected={tempKeys.has(propertyType.key)}
                                    onValueChange={(isSelected) =>
                                        handleCheckboxChange(propertyType.key, isSelected)
                                    }
                                    classNames={{
                                        base: "inline-flex w-full max-w-full bg-content1 m-0 p-3 rounded-lg cursor-pointer hover:bg-content2 items-center justify-start data-[selected=true]:border-primary data-[selected=true]:bg-primary/10",
                                        label: "w-full",
                                    }}
                                >
                                    <div className="w-full flex justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{propertyType.emoji}</span>
                                            <span className="text-small font-medium text-gray-900">
                                                {propertyType.label}
                                            </span>
                                        </div>
                                    </div>
                                </Checkbox>
                            ))}
                        </div>

                        <div className="flex justify-between gap-2 px-4 py-2 border-t border-gray-200">
                            <Button
                                variant="light"
                                onPress={handleClear}
                                className="text-gray-600"
                            >
                                Limpiar
                            </Button>
                            <Button
                                className="bg-teal-700 text-white hover:bg-teal-800 transition-colors"
                                onPress={handleConfirm}
                            >
                                Ver resultados
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}