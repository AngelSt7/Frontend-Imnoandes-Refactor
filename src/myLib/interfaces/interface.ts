import { Meta } from "@/src/schema/shared";

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

export interface Option { 
  key: string | number; 
  label: string; 
  active?: boolean | number; 
}
