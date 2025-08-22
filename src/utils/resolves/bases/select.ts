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
  { key: 'f81254d3-17f4-46ca-a983-614bde3d73c6', label: 'Lima' },
  { key: '56312170-d32f-4c07-976f-471df01d8e22', label: 'Cusco' },
  { key: '876079b1-935a-42d7-87ea-3fd555136c90', label: 'Ica' },
  { key: 'ed69c503-91c7-41f0-8c95-ee9e936b8ae7', label: 'Arequipa' },
  { key: 'fccc85e5-0578-4b7a-98a0-f4c0f8b8f910', label: 'Piura' },
]

export const DEPARTMENT_DROPDOWN = [...DEPARTMENT_SELECT, { key: 'all', label: 'Todos' }]