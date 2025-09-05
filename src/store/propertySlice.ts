import { StateCreator } from "zustand";
import { PaginationType } from "../types/adminTypes/property";

export type PropertySlice = {
    limit: number;
    onChangelimit: (limit: number) => void;
};


export const createPropertySlice: StateCreator<PropertySlice> = (set, get) => ({
    limit: 10,
    onChangelimit: (limit) => { set(()=>({ limit }))},
})
