import { useRouter, useSearchParams } from "next/navigation";
import { Actions, IOpenModal, ValidParams } from "./interfaces";

export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const openModal = (meta: IOpenModal) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, meta.action);
        if (meta.id) params.set(ValidParams.id, meta.id);
        router.replace(`?${params.toString()}`);
    }

    const closeModal = (actions?: Actions[]) => {
        const params = new URLSearchParams(searchParams.toString());
        const deletes = actions ? actions : [ValidParams.action, ValidParams.id, ValidParams.details, ValidParams.edit, ValidParams.customImages]

        Array.from(params.keys()).forEach((keys) => {
            if (deletes.includes(keys)) {
                params.delete(keys);
            }
        })

        router.replace(`?${params.toString()}`);
    };


    return { closeModal, searchParams, openModal };
};
