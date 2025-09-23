
import { Province, District } from "@/src/features/property/admin/services";
import { useGetData } from "@/src/myLib/hooks";

export const useUbigeoData = (
  departmentId: string,
  provinceId: string
) => {
  const { data: Provinces = [], ...provinceQuery } = useGetData({
    functionService: Province.list,
    id: departmentId,
    queryKey: ["provinces", departmentId],
  });

  const { data: Districts = [], ...districtQuery } = useGetData({
    functionService: District.list,
    id: provinceId,
    queryKey: ["districts", provinceId],
  });

  return {
    Provinces,
    Districts,
    provinceQuery,
    districtQuery,
  };
};
