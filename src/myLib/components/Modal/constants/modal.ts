export const Tittles : Record<string, string> = {
    '/dashboard/properties': 'Administrar Propiedades',
}
export const ActionLabels: Record<string, string> = {
  create: "Add",
  edit: "Edit",
  "custom-images": "Custom images of",
  "change-status": "Change status of",
};

export const Entity : Record<string, ENTITY> = {
    '/dashboard/properties': 'property',
}


type ENTITY = 'property' | 'client'