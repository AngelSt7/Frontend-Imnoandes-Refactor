import { usePathname, useSearchParams } from "next/navigation";
import { pluralToSingular } from "@/src/utils";
import { User } from "@/src/types/userTypes/user";
import { CreateProperty } from "@/src/components";
import ImageManagerOrquest from "@/src/components/dashboard/properties/gallery/ImageManagerOrquest";

interface GenericModalProps {
    user?: User;
    defaultValues?: any;
    id?: string;
    closeModal: () => void;
}

export function useGenericModal({
    user,
    defaultValues,
    id,
    closeModal
}: GenericModalProps) {
    const path = usePathname();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const rawEntity = path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2];

    const entity = pluralToSingular[rawEntity];

    const isDetails = action === "details" && !!entity
    const isCustomImage = action === "custom-images" && !!entity
    const isCreate = action === "create" && !!entity;
    const isEdit = action === "edit" && !!entity && !!defaultValues;
    const isChangeStatus = action === "changeStatus" && !!entity && !!defaultValues;
    const showModal = isCreate || isEdit || isChangeStatus || isDetails || isCustomImage;

    const getTitle = () => {
        let base = "";

        switch (action) {
            case "create":
                base = "Add";
                break;
            case "edit":
                base = "Edit";
                break;
            case "custom-images":
                base = "Custom images of";
                break;
            case "changeStatus":
                base = "Change status of";
            default:
                base = "";
        }

        const entityName = entity?.charAt(0).toUpperCase() + entity?.slice(1);
        return `${base} ${entityName}`;
    };

    const renderForm = () => {
        if (!entity) return null;

        if (isCreate) {
            switch (entity) {
                case "property": return <CreateProperty />
            }
        }

        if (isEdit) {
            switch (entity) {

            }
        }

        if (isDetails) {
            switch (entity) {
                // case "property": return <ImageManagerOrquest tittle={"Galería"} />
            }
        }

        if(isCustomImage){
            switch(entity){
                case "property": return <ImageManagerOrquest tittle={"Galería"} />
            }
        }

        if (isChangeStatus) {
            switch (entity) {

            }
        }
        return null;
    };

    return {
        getTitle,
        renderForm,
        showModal,
        isCustomImage
    };
};
