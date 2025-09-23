import { createContext, useContext } from 'react';

interface DrawerContextType {
  isInDrawer: boolean;
}

const DrawerContext = createContext<DrawerContextType>({ isInDrawer: false });

export const useDrawerContext = () => useContext(DrawerContext);

interface DrawerProviderProps {
  children: React.ReactNode;
  isInDrawer?: boolean;
}

export const DrawerProvider = ({ children, isInDrawer = false }: DrawerProviderProps) => {
  return (
    <DrawerContext.Provider value={{ isInDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};