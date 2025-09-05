import { useRouter, useSearchParams } from "next/navigation";

const ValidParams = {
    action: "action",
    id: "id",
    page: "page",
    create: "create",
    details: "details",
    customImages: "custom-images",
    edit: "edit",
    changeStatus: "changeStatus",
}

export enum Actions {
    action = "action",
    id = "id",
    page = "page",
    create = "create",
    details = "details",
    customImages = "custom-images",
    edit = "edit",
    changeStatus = "changeStatus",
}

export interface IOpenModal {
    action: Actions,
    id?: string
}

interface useModalUtils {
    openModal: ({ action, id }: IOpenModal) => void
}


export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParam = (key: string) => searchParams.get(key)

    const openModal = (meta: IOpenModal) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, meta.action);
        if (meta.id) params.set(ValidParams.id, meta.id);
        router.replace(`?${params.toString()}`);
    }

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        const deletes = [ValidParams.action, ValidParams.id, ValidParams.details, ValidParams.edit, ValidParams.customImages];

        Array.from(params.keys()).forEach((keys) => {
            if (deletes.includes(keys)) {
                params.delete(keys);
            }
        })

        router.replace(`?${params.toString()}`);
    };


    return { closeModal, searchParams, getParam, openModal };
};
