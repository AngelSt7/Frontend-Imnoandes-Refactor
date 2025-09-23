# 🔗 Hook `useQueryParam`

Hook personalizado para manejar parámetros de búsqueda (`query params`) en aplicaciones **Next.js (App Router)**.

## 📦 Importación

```tsx
import { useQueryParam } from "@/hooks/useQueryParam";
```

## 🚀 API

### `setParam(key: string, value: string): void`

Agrega o actualiza un parámetro en la URL.

```tsx
setParam("page", "2"); 
// 👉 ?page=2
```

### `getParam(key: string): string | undefined`

Obtiene el valor de un parámetro de la URL.

```tsx
const page = getParam("page"); 
// 👉 "2" (si existe) o undefined
```

### `keepParams(keys: string[]): void`

Mantiene solo los parámetros especificados y elimina el resto.

```tsx
keepParams(["page"]); 
// 👉 conserva solo "page"
```

### `clearParams(keys: string[]): void`

Elimina uno o varios parámetros de la URL.

```tsx
clearParams(["currency", "bedrooms"]); 
// 👉 elimina esos parámetros de la query
```

## 📌 Ejemplo de uso

```tsx
"use client";

import { useQueryParam } from "@/hooks/useQueryParam";

export default function Filters() {
  const { setParam, getParam, keepParams, clearParams } = useQueryParam();

  return (
    <div>
      <button onClick={() => setParam("page", "1")}>
        Ir a página 1
      </button>
      <button onClick={() => clearParams(["page"])}>
        Limpiar página
      </button>
      <button onClick={() => keepParams(["page"])}>
        Mantener solo página
      </button>

      <p>Página actual: {getParam("page")}</p>
    </div>
  );
}
```