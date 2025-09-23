import { StateCreator } from "zustand";

export type DrawerSlice = {
  statusDrawer: boolean;
  onChangeDrawer: () => void;
};

export const useDrawerSlice: StateCreator<DrawerSlice> = (set, get) => ({
  statusDrawer: false,
  onChangeDrawer: () => {
    set((state) => ({ statusDrawer: !state.statusDrawer }));
  },
});
