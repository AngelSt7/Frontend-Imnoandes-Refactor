export enum PROPERTY_TYPE {
  VENTA = 'SALE',
  ALQUITLER = 'RENT'
}

export enum CURRENCY {
  PEN = 'PEN',
  USD = 'USD'
}

export enum PROPERTY_CATEGORY {
  CASA = 'HOUSE',
  APARTAMENTO = 'APARTMENT',
  TERRENO = 'LAND',
  COMERCIAL = 'COMMERCIAL',
  OFICINA = 'OFFICE',
  ALMACEN = 'WAREHOUSE',
}


export const PROPERTY_CATEGORY_TRANSLATE: Record<string, string> = {
  HOUSE: 'Casa',
  APARTMENT: 'Departamento',
  LAND: 'Terreno',
  COMMERCIAL: 'Local Comercial',
  OFFICE: 'Oficina',
  WAREHOUSE: 'Almacen',
};

export const PROPERTY_TYPE_TRANSLATE : Record<string, string> = {
  SALE: 'Venta',
  RENT: 'Aquiler'
}
