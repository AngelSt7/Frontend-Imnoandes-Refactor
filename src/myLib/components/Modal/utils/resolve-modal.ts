import { ActionLabels, Tittles } from "../constants";

  export function resolveActionFlags(action?: string | null, entity?: string, id?: string, defaultValues?: any) {
    const isDetails = action === "details" && !!entity && !!id && !!defaultValues;
    const isCustomImage = action === "custom-images" && !!entity && !!defaultValues;
    const isCreate = action === "create" && !!entity;
    const isEdit = action === "edit" && !!entity && !!defaultValues;

    return {
      showModal: isCreate || isEdit || isDetails || isCustomImage,
    };
  }

export function resolveTitle(action?: string | null, path?: string, entity?: string) {
  const actionLabel = action ? ActionLabels[action] ?? "" : "";
  const entityTitle = (path && Tittles[path]) ?? entity ?? "";
  return `${actionLabel} ${entityTitle}`.trim();
}
