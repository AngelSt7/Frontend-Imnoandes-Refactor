'use client'

import { SelectSEO } from "@/src/myLib/components";
import { Building2, Home, Warehouse, Trees, Building, Store } from "lucide-react";


const options = [
  { key: "APARTMENT", icon: Building2, label: "Departamento", slug: "departamentos" },
  { key: "HOUSE", icon: Home, label: "Casa", slug: "casas" },
  { key: "WAREHOUSE", icon: Warehouse, label: "Almacenes", slug: "almacenes" },
  { key: "LAND", icon: Trees, label: "Terreno / Lote", slug: "terrenos" },
  { key: "OFFICE", icon: Building, label: "Oficina comercial", slug: "oficinas" },
  { key: "COMMERCIAL", icon: Store, label: "Local comercial", slug: "locales-comerciales" },
];

const propertyTypes = [
  { key: "SALE", icon: Building2, label: "Venta", slug: "venta" },
  { key: "RENT", icon: Home, label: "Alquiler", slug: "alquiler" }
];

export default function page() {

    // regex de optiones /(-de-)([^/]+?)(?=-en-|$)/}
    
  return (
    <>
        <SelectSEO
          regex={/(-de-)([^/]+?)(?=-en-|$)/}
          mode="single"
          options={options}
        />

    </>
  )
}
