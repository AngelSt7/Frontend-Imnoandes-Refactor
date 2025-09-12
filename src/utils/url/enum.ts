// export const OptionsPropertyType = [
//     { key: "SALE", value: "Venta" },
//     { key: "RENT", value: "Alquiler" },
// ]

export const PropertyTypeEnum : Record<string, string> = {
    venta: 'SALE',
    alquiler: 'RENT'
}

export const PropertyCategoryEnum : Record<string, string> = {
    casas: 'HOUSE',
    departamentos: 'APARTMENT',
    terrenos: 'LAND',
    comercials: 'COMMERCIAL',
    oficinas: 'OFFICE',
    almacens: 'WAREHOUSE',
}