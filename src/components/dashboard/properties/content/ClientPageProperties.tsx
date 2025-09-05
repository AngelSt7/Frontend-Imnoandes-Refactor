"use client";

import { AdminProperty, User } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";
import { PropertyAdmin } from "@/src/services/admin";
import { RenderCellProperty } from "@/src/components/dashboard/properties/cells/RenderCellProperty";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";
import { useSubmitMutation } from "@/src/hooks";
import Filters from "./Filters";
import GenericDataWrapper from "@/src/components/ui/generic/GenericDataWrapper";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import TableContent from "@/src/components/dashboard/ui/table/TableContent";

interface ClientPagePropertiesProps {
    user: User
}

export default function ClientPageProperties({ user }: ClientPagePropertiesProps) {
    const { openModal, closeModal } = useModalUtils();
    const { setParam, deleteParam, getParam } = useParams();
    const ID = getParam("id");

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.changeStatus,
        invalidateQueries: [
            ["properties", user.id]
        ],
    });

    return (
        <>
        <p>Mis Propiedades</p>
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


            {ID &&

                <GenericDataWrapper
                    closeModal={closeModal}
                    id={ID}
                    serviceFunction={PropertyAdmin.find}
                    queryKey="property"
                />
            }

        </>
    );
}
