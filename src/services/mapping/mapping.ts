import { UseGetFilters } from "@/src/hooks/search/useGetFilters";
import { PropertyAdmin } from "../admin";
import { ApiResponse } from "@/src/components/dashboard/ui/table/TableContent";

type ServiceFn<T> = (filters: UseGetFilters) => Promise<ApiResponse<T> | undefined>;

export const servicesMap: Record<string, ServiceFn<any>> = {
  properties: async (filters: UseGetFilters) => await PropertyAdmin.list(filters),

};
