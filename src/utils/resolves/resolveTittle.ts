//Asignar una ruta y el titulo de esta
// Ejemplo: "/usuarios" : "Administrar Usuarios"
export const Tittles: Record<string, string> = {
    '/dashboard/properties': 'Administrar Propiedades',

};

// Mapear entidades
type Entity = 'property' |'prueba';

// ruta => singular
export const pluralToSingular: Record<string, Entity> = {
    properties: "property",
    prueba: "prueba",
};


// export const labelMap: Record<string, string> = {
//   suppliers: "Proveedor",
// };

// export const entityLabelMap: Record<string, string> = {
//   suppliers: "proveedores",
// };