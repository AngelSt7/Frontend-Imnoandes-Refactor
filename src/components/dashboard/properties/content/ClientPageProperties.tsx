"use client";

import TableContent from "@/src/components/dashboard/ui/table/TableContent";
import { AdminProperty } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";
import { RenderCellProperty } from "@/src/components/dashboard/properties/cells/RenderCellProperty";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import Filters from "./Filters";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";
import GenericDrawer from "@/app/success/GenericDrawer";

export default function ClientPageProperties() {
    const { openModalEdit, openDetailsModal } = useModalUtils();
    const { setParam, deleteParam, getParam } = useParams();
    
    return (
        <>
            <TableContent<AdminProperty>
                queryKey={"properties"}
                columns={Columns}
                defaultVisibleColumns={["name", "price", "currency", "availability", "actions"]}
                renderCells={RenderCellProperty}
                renderFilters={Filters}
                onEdit={(id) => openModalEdit(id)}
                onDetails={(id) => openDetailsModal(id)}
                onAddParam={(key, value) => setParam(key, value)}
                onDeleteParam={(key) => deleteParam(key)}
                onGetParam={(key) => getParam(key)}
            />

            <GenericModal />
            
            <GenericDrawer
                width="99"
                descriptionDrawer="Aquí podrás editar la información de la propiedad"
            />
        </>
    );
}
