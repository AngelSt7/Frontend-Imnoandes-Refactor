# 📌 Uso del componente Drawer

El componente **Drawer** requiere una función de abrir y cerrar manejada desde un **estado global**.  

## Ejemplo de uso <CARPETA SLICE>

```tsx
const statusDrawer = useAppStore((state) => state.statusDrawer);
const onChangeDrawer = useAppStore((state) => state.onChangeDrawer);
