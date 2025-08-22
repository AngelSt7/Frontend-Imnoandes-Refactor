"use client";

import TableContent from "@/src/components/dashboard/ui/table/TableContent";
import { AdminProperty } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";
import { RenderCellProperty } from "@/src/components/dashboard/properties/cells/RenderCellProperty";
import GenericModal from "@/src/components/ui/generic/GenericModal";
import Filters from "./Filters";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useParams } from "@/src/hooks/search/useParams";

export default function ClientPageProperties() {
    const { openModalCreate, openModalEdit, openDetailsModal } = useModalUtils();
    const { setParam, deleteParam, getParam } = useParams();
    
    return (
        <>
            <TableContent<AdminProperty>
                queryKey={"properties"}
                columns={Columns}
                defaultVisibleColumns={["name", "price", "currency", "availability", "actions"]}
                renderCells={RenderCellProperty}
                renderFilters={Filters}
                onCreate={openModalCreate}
                onEdit={(id) => openModalEdit(id)}
                onDetails={openDetailsModal}
                onAddParam={(key, value) => setParam(key, value)}
                onDeleteParam={(key) => deleteParam(key)}
                onGetParam={(key) => getParam(key)}
            />

            <GenericModal />
        </>
    );
}
