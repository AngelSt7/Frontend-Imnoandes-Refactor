import { usePathname, useSearchParams } from "next/navigation";
import { resolveActionFlags, resolveTitle } from "../utils";
import { formsByAction } from "../utils/resolve-component";
import { Entity } from "../constants";

interface GenericModalProps<T> {
    user?: T;
    defaultValues?: any;
    id?: string;
}

export function useGenericModal<T>({
    user,
    defaultValues,
    id,
}: GenericModalProps<T>) {

    const path = usePathname();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const entity = Entity[path];
    const { showModal } = resolveActionFlags(action, entity, id, defaultValues);
    const getTitle = () => resolveTitle(action, path, entity);


    const renderForm = () => {
        if (!entity || !action) return null;

        const actionForms = formsByAction[action];
        if (!actionForms) return null;

        const Form = actionForms[entity];
        return Form ? Form({ user, defaultValues }) : null;
    };

    return {
        getTitle,
        renderForm,
        showModal
    };
};
