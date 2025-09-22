"use client";

import { User } from "@/src/types";

import { COLUMNS } from "@/src/features/property/admin/constants";
import { AdminProperty, TOP_CONTENT_SHOW } from "@/src/features/property/admin/interfaces";
import { PropertyAdmin } from "@/src/features/property/admin/services";
import { buildKey, resolveFunction } from "@/src/features/property/admin/utils";


import { useModalUtils } from "@/src/myLib/hooks/modal/useModalUtils/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";
import GenericDataWrapper from "@/src/components/ui/generic/GenericDataWrapper";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import { Button } from "@heroui/react";
import { Actions, TableContent, useSubmitMutation } from "@/src/myLib";


import { Filters, RenderCellProperty, TopContent } from "./components";


export function ClientPageProperties({ user }: { user: User }) {
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
            <TableContent<AdminProperty, TOP_CONTENT_SHOW>
                columns={COLUMNS}
                topContent={TopContent}
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
                    serviceFunction={resolveFunction(ID, action)!}
                    queryKey={buildKey(action, ID)}

                    closeModal={closeModal}
                />
            )}

        </>
    );
}
