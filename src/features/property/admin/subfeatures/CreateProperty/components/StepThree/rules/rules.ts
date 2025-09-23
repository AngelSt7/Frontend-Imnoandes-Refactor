import { PROPERTY_CATEGORY } from "@/src/features/property/admin/constants";

export const rules = {
  getLabelFloor: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
      case PROPERTY_CATEGORY.COMERCIAL:
      case PROPERTY_CATEGORY.OFICINA:
      case PROPERTY_CATEGORY.ALMACEN:
        return "Número de pisos";
      case PROPERTY_CATEGORY.APARTAMENTO:
        return "Piso";
      default:
        return "Piso";
    }
  },

  getErrorFloor: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
      case PROPERTY_CATEGORY.COMERCIAL:
      case PROPERTY_CATEGORY.OFICINA:
      case PROPERTY_CATEGORY.ALMACEN:
        return "El número de pisos es obligatorio";
      case PROPERTY_CATEGORY.APARTAMENTO:
        return "El piso en el cual se encuentra la propiedad es obligatorio";
      default:
        return "El piso es obligatorio";
    }
  },

  getMaxFloor: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
        return 8;
      case PROPERTY_CATEGORY.APARTAMENTO:
      case PROPERTY_CATEGORY.COMERCIAL:
        return 50;
      case PROPERTY_CATEGORY.OFICINA:
        return 20;
      default:
        return 100;
    }
  },

  getMaxBedrooms: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
      case PROPERTY_CATEGORY.APARTAMENTO:
        return 10;
      default:
        return 0;
    }
  },

  getMaxBathrooms: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
      case PROPERTY_CATEGORY.APARTAMENTO:
        return 10;
      case PROPERTY_CATEGORY.COMERCIAL:
      case PROPERTY_CATEGORY.OFICINA:
        return 20;
      case PROPERTY_CATEGORY.ALMACEN:
        return 5;
      default:
        return 5;
    }
  },

  getMaxParkingSpaces: (propertyCategory?: string) => {
    switch (propertyCategory) {
      case PROPERTY_CATEGORY.CASA:
        return 5;
      case PROPERTY_CATEGORY.APARTAMENTO:
        return 2;
      case PROPERTY_CATEGORY.COMERCIAL:
      case PROPERTY_CATEGORY.OFICINA:
        return 50;
      case PROPERTY_CATEGORY.ALMACEN:
        return 20;
      default:
        return 5;
    }
  },
};
