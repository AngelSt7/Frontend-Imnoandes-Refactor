import { usePathname, useSearchParams } from "next/navigation";
import { pluralToSingular } from "@/src/utils";
import { User as UserInfo } from "@/src/types/userTypes/user";
import { CreateProperty, EditProperty } from "@/src/components";
import ImageManagerOrquest from "@/src/components/dashboard/properties/gallery/ImageManagerOrquest";
import DetailsProperty from "@/src/components/dashboard/properties/actions/DetailsProperty";

interface GenericModalProps {
    user?: UserInfo;
    defaultValues?: any;
    id?: string;
}

export function useGenericModal({
    user,
    defaultValues,
    id,
}: GenericModalProps) {
    const path = usePathname();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const rawEntity = path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2];

    const entity = pluralToSingular[rawEntity];

    const isDetails = action === "details" && !!entity && !!id && !!defaultValues
    const isCustomImage = action === "custom-images" && !!entity && !!defaultValues
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
                case "property": return <EditProperty user={user} defaultValues={defaultValues} />
            }
        }

        if (isDetails) {
            switch (entity) {
                case "property": return <DetailsProperty data={defaultValues}/>
            }
        }

        if(isCustomImage){
            switch(entity){
                case "property": return <ImageManagerOrquest defaultValues={defaultValues}  />
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
