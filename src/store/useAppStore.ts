import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createPropertySlice, PropertySlice } from "./propertySlice";
import { PublicPropertySlice, publicPropertySlice } from "./publicPropertySlice";
import { DrawerSlice, useDrawerSlice } from "./useDrawerSlice";
import { CropSlice, useCropSlice } from './useCropSlice';

export const useAppStore = create<PropertySlice & PublicPropertySlice & DrawerSlice & CropSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createPropertySlice(...a),
                ...publicPropertySlice(...a),
                ...useDrawerSlice(...a),
                ...useCropSlice(...a),
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take, 
                    propertiesFavorites: state.propertiesFavorites
                }),
            }
        )
    )
);
