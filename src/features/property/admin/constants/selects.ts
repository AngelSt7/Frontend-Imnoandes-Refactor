import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "./enums"

export const PROPERTY_TYPE_SELECT = [
  { key: PROPERTY_TYPE.VENTA, label: 'Venta' },
  { key: PROPERTY_TYPE.ALQUITLER, label: 'Alquiler' }
]

export const CURRENCY_SELECT = [
  { key: CURRENCY.PEN, label: 'PEN' },
  { key: CURRENCY.USD, label: 'USD' }
]

export const PROPERTY_CATEGORY_SELECT = [
  { key: PROPERTY_CATEGORY.CASA, label: 'Casa' },
  { key: PROPERTY_CATEGORY.APARTAMENTO, label: 'Apartamento' },
  { key: PROPERTY_CATEGORY.TERRENO, label: 'Terreno' },
  { key: PROPERTY_CATEGORY.COMERCIAL, label: 'Comercial' },
  { key: PROPERTY_CATEGORY.OFICINA, label: 'Oficina' },
  { key: PROPERTY_CATEGORY.ALMACEN, label: 'Almacen' },
]

export const DEPARTMENT_SELECT = [
  { key: '817a3c11-a403-4c63-bf45-b0cf472d82b3', label: 'Lima' },
  { key: '31581e72-0de3-49f4-ade3-519c32b97c68', label: 'Cusco' },
  { key: 'f9b96f9a-8635-4ea0-83aa-de7d6098b060', label: 'Ica' },
  { key: 'ead7ba7b-dc0e-468c-8701-9e6302d6abdf', label: 'Arequipa' },
  { key: 'd6f19842-5452-4b39-aa46-596b5225fcf5', label: 'Piura' },
]