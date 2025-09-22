import { ColumnsType } from "@/src/myLib";

export const COLUMNS: ColumnsType = [
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Precio", uid: "price", sortable: true },
  { name: "Moneda", uid: "currency", sortable: true },
  { name: "Tipo de Propiedad", uid: "propertyType", sortable: true },
  { name: "Categoría", uid: "propertyCategory", sortable: true },
  { name: "Disponible", uid: "availability", sortable: true },
  { name: "Área (m²)", uid: "area", sortable: true },
  { name: "Año Construcción", uid: "yearBuilt", sortable: true },
  { name: "Baños", uid: "bathrooms", sortable: true },
  { name: "Dormitorios", uid: "bedrooms", sortable: true },
  { name: "Ubicación", uid: "address", sortable: true },
  { name: "Creado", uid: "createdAt", sortable: true },
  { name: "Actualizado", uid: "updatedAt", sortable: true },
  { name: "Acciones", uid: "actions" },
];
