"use client";

import TableContent from "@/src/components/dashboard/ui/table/TableContent";
import { AdminProperty } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";
import { RenderCellProperty } from "@/src/components/dashboard/properties/cells/RenderCellProperty";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import Filters from "./Filters";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";
import GenericDataWrapper from "@/src/components/ui/generic/GenericDataWrapper";
import { PropertyAdmin } from "@/src/services/admin";
import { useSubmitMutation } from "@/src/hooks";

export default function ClientPageProperties() {
    const { openModalEdit, openDetailsModal, closeModal } = useModalUtils();
    const { setParam, deleteParam, getParam } = useParams();
    const ID = getParam("id");
    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.changeStatus
    });

    return (
        <>
            <TableContent<AdminProperty>
                columns={Columns}
                queryKey={"properties"}
                defaultVisibleColumns={["name", "price", "currency", "propertyType", "propertyCategory" , "availability", "actions"]}
                renderCells={RenderCellProperty}
                renderCellsProps={{
                    onDetails: openDetailsModal,
                    onEdit: openModalEdit,
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

            {/* <GenericDrawer
                width="99"
                descriptionDrawer="Aquí podrás editar la información de la propiedad"
            /> */}
        </>
    );
}
