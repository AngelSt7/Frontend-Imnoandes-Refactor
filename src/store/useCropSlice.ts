import { StateCreator } from "zustand";

export type CropSlice = {
    statusModalCrop: boolean
    onChangeModalCrop: () => void
};


export const useCropSlice: StateCreator<CropSlice> = (set, get) => ({
    statusModalCrop: false,
    onChangeModalCrop: () => { set((state) => ({ statusModalCrop: !state.statusModalCrop })) },
})
