import { Meta } from "@/src/schema/shared";

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}