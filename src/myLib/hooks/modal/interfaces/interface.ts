export const ValidParams = {
    action: "action",
    id: "id",
    page: "page",
    create: "create",
    details: "details",
    customImages: "custom-images",
    edit: "edit",
    changeStatus: "change-status",
}

export enum Actions {
    action = "action",
    id = "id",
    page = "page",
    create = "create",
    details = "details",
    customImages = "custom-images",
    edit = "edit",
    changeStatus = "change-status",
}

export interface IOpenModal {
    action: Actions,
    id?: string
}

export interface useModalUtils {
    openModal: ({ action, id }: IOpenModal) => void
}
