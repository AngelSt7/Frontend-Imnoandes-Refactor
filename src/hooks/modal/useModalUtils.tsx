import { useRouter, useSearchParams } from "next/navigation";
export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();
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

    const openModalCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, ValidParams.create);
        router.replace(`?${params.toString()}`);
    };

    const openDetailsModal = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, ValidParams.customImages);
        params.set("id", id);
        router.replace(`?${params.toString()}`);
    };

    const openModalEdit = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ValidParams.action, ValidParams.edit);
        params.set("id", Number(id).toString());
        router.replace(`?${params.toString()}`);
    };

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


    return { openModalCreate, openDetailsModal, openModalEdit, closeModal, searchParams };
};
