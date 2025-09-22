import { PropertyAdmin } from "@/src/features/property/admin/services";

export const resolveFunction = (ID: string, action: string) => {
    let functionName
    if (ID && action === "details") {
        functionName = PropertyAdmin.details
    }
    if (ID && action === "edit") {
        functionName = PropertyAdmin.find
    }
    if (ID && action === "custom-images") {
        functionName = PropertyAdmin.images
    }
    return functionName;
};