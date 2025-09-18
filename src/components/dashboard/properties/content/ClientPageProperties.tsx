"use client";

import { AdminProperty, User } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";
import { PropertyAdmin } from "@/src/services/admin";
import { RenderCellProperty } from "@/src/components/dashboard/properties/cells/RenderCellProperty";
import { Actions, useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";
import Filters from "./Filters";
import GenericDataWrapper from "@/src/components/ui/generic/GenericDataWrapper";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import TableContent from "@/src/components/dashboard/ui/table/TableContent";
import { act } from "react";
import { Button } from "@heroui/react";
import { useSubmitMutation } from "@/src/myLib";

interface ClientPagePropertiesProps {
    user: User
}

export default function ClientPageProperties({ user }: ClientPagePropertiesProps) {
    const { openModal, closeModal } = useModalUtils();
    const { setParam, deleteParam, getParam } = useParams();
    const ID = getParam("id");
    const action = getParam("action");

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.changeStatus,
        invalidateQueries: [
            ["properties", user.id]
        ],
    });

    const resolveFunction = () => {
        let functionName
        if (ID && action === "details") {
            functionName = PropertyAdmin.details
        }
        if (ID && action === "edit") {
            functionName = PropertyAdmin.find
        }
        if(ID && action === "custom-images"){
            functionName = PropertyAdmin.images
        }
        return functionName;
    };

    // utils/queryKeys.ts
    const buildPropertyQueryKey = (action: string | null, id: string | null) => {
        if (!id) return ["property"];

        switch (action) {
            case "details":
                return ["property", "details", id];
            case "edit":
                return ["property", "edit", id];
            case "custom-images":
                return ["property", "custom-images", id];
            default:
                return ["property", id];
        }
    };


    return (
        <>

            <div className='block md:hidden'>
                <Button
                    onPress={() => openModal({ action: Actions.create })}
                    type='submit'
                    radius='full'
                    className='w-full px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition flex items-center gap-2 bg-gray-100 hover:bg-gray-50 shadow-sm hover:shadow-md '
                >
                    Agregar propiedad
                </Button>
            </div>
            <TableContent<AdminProperty>
                columns={Columns}
                baseKey={["properties", user.id]}
                defaultVisibleColumns={["name", "price", "currency", "propertyType", "propertyCategory", "availability", "actions"]}
                renderCells={RenderCellProperty}
                renderCellsProps={{
                    onOpenModal: openModal,
                    onMutate: mutate
                }}
                renderFilters={Filters}
                onList={PropertyAdmin.list}
                onAddParam={setParam}
                onDeleteParam={deleteParam}
                onGetParam={getParam}
                getRowId={(item) => item.id}
            />

            <GenericModal closeModal={closeModal} />

            {((ID && action === "details") || (ID && action === "edit") || (ID && action === "custom-images")) && (
                <GenericDataWrapper
                    id={ID}
                    user={user}
                    serviceFunction={resolveFunction()!}
                    queryKey={buildPropertyQueryKey(action, ID)}
                    closeModal={closeModal}
                />
            )}

        </>
    );
}
