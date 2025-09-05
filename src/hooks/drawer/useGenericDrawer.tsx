import { usePathname, useSearchParams } from "next/navigation";
import { pluralToSingular } from "@/src/utils";
import { User } from "@/src/types/userTypes/user";
import { useModalUtils } from "../modal/useModalUtils";
import ImageManagerOrquest from "@/src/components/dashboard/properties/gallery/ImageManagerOrquest";
import { Dispatch, SetStateAction } from "react";

interface GenericDrawerProps {
    user?: User;
    defaultValues?: any;
    id?: string;
    closeModal?: () => void;
}

interface RenderFormProps {
    tittle: string
}


export function useGenericDrawer() {
    const { closeModal } = useModalUtils();
    const path = usePathname();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const id = Boolean(searchParams.get("id"));
    const rawEntity = () => {
        try {
            return path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2]
        } catch (error) {
            return "prueba"
        }
    };

    const entity = pluralToSingular[rawEntity()] ?? "prueba";

    const isDetails = action === "details" && id && !!entity
    const showModal = isDetails;

    const getTitle = () => {
        let base = "";

        switch (action) {
            case "details":
                base = "Details of";
                break;
        }

        const entityName = entity?.charAt(0).toUpperCase() + entity?.slice(1);
        return `${base} ${entityName}`;
    };

    const renderForm = ({ tittle,  } : RenderFormProps) => {
        if (!entity) return null;

        if (isDetails) {
            switch (entity) {
                case "property": return <ImageManagerOrquest />
            }
        }

        return null;
    };

    return {
        getTitle,
        renderForm,
        showModal,
        isDetails,
        closeModal
    };
};
