import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createPropertySlice, PropertySlice } from "./propertySlice";
import { PublicPropertySlice, publicPropertySlice } from "./publicPropertySlice";
import { DrawerSlice, useDrawerSlice } from "./useDrawerSlice";

export const useAppStore = create<PropertySlice & PublicPropertySlice & DrawerSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createPropertySlice(...a),
                ...publicPropertySlice(...a),
                ...useDrawerSlice(...a),
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    propertiesFavorites: state.propertiesFavorites
                }),
            }
        )
    )
);